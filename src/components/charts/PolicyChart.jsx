import { useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useStore } from '../../store/useStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler)

const PolicyChart = ({ filteredData }) => {
  const { policies, theme, searchFilters } = useStore()
  
  const displayPolicies = useMemo(() => {
    if (filteredData) return filteredData
    
    const { keyword, region, industry } = searchFilters
    return policies.filter(policy => {
      const matchesKeyword = !keyword || 
        policy.title.toLowerCase().includes(keyword.toLowerCase()) ||
        policy.description.toLowerCase().includes(keyword.toLowerCase())
      const matchesRegion = !region || policy.region === region
      const matchesIndustry = !industry || policy.industry === industry
      return matchesKeyword && matchesRegion && matchesIndustry
    })
  }, [policies, filteredData, searchFilters])

  const industryData = useMemo(() => {
    const counts = {}
    displayPolicies.forEach(p => {
      counts[p.industry] = (counts[p.industry] || 0) + 1
    })
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8)
    return Object.fromEntries(sorted)
  }, [displayPolicies])

  const regionData = useMemo(() => {
    const counts = {}
    displayPolicies.forEach(p => {
      counts[p.region] = (counts[p.region] || 0) + 1
    })
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8)
    return Object.fromEntries(sorted)
  }, [displayPolicies])

  const barChartData = {
    labels: Object.keys(industryData),
    datasets: [
      {
        label: '政策数量',
        data: Object.values(industryData),
        backgroundColor: '#2563EB',
        borderRadius: 8,
        barThickness: 28
      }
    ]
  }

  const doughnutData = {
    labels: ['高匹配(90%+)', '中匹配(70-89%)', '低匹配(70%以下)'],
    datasets: [
      {
        data: [
          displayPolicies.filter(p => p.matchScore >= 90).length,
          displayPolicies.filter(p => p.matchScore >= 70 && p.matchScore < 90).length,
          displayPolicies.filter(p => p.matchScore < 70).length
        ],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0
      }
    ]
  }

  const horizontalBarData = {
    labels: Object.keys(regionData),
    datasets: [
      {
        label: '地区政策量',
        data: Object.values(regionData),
        backgroundColor: '#2563EB',
        borderRadius: 8
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: theme === 'light' ? '#1F2937' : '#374151',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
        },
        ticks: {
          color: theme === 'light' ? '#64748B' : '#94A3B8'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: theme === 'light' ? '#64748B' : '#94A3B8',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme === 'light' ? '#64748B' : '#94A3B8',
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: theme === 'light' ? '#1F2937' : '#374151',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8
      }
    },
    cutout: '65%'
  }

  const horizontalBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: theme === 'light' ? '#1F2937' : '#374151',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
        },
        ticks: {
          color: theme === 'light' ? '#64748B' : '#94A3B8'
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: theme === 'light' ? '#64748B' : '#94A3B8'
        }
      }
    }
  }

  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium mb-4 dark:bg-blue-900/30">
            数据洞察
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            政策数据分析
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
            基于海量政策数据，为您呈现行业趋势和匹配分析
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              行业政策分布
            </h3>
            <div className="h-64">
              <Bar data={barChartData} options={options} />
            </div>
          </div>

          <div className="rounded-2xl p-6 border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              匹配度分布
            </h3>
            <div className="h-64">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          <div className="rounded-2xl p-6 border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              地区政策分布
            </h3>
            <div className="h-64">
              <Bar data={horizontalBarData} options={horizontalBarOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PolicyChart
