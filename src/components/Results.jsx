import { useState, useEffect, useMemo } from 'react'
import { Award, TrendingUp, Clock, ArrowRight, CheckCircle, Sparkles, Filter, SlidersHorizontal, BarChart3, Radar, ChevronDown, GitCompare } from 'lucide-react'
import { useStore } from '../store/useStore'
import StatsCard from './StatsCard'
import PolicyCard from './PolicyCard'

const darkModeColor = '#94A3B8'
const lightModeColor = '#64748B'

function Results({ companyName, onPolicyClick, onGenerateMaterials, onCompare }) {
  const { policies, compareList, toggleCompare, theme } = useStore()
  
  const [countdown, setCountdown] = useState('7 天 12 小时')
  const [animatedAmount, setAnimatedAmount] = useState(0)
  const [filteredPolicies, setFilteredPolicies] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('match')
  const [showChart, setShowChart] = useState(true)
  
  useEffect(() => {
    const sortedPolicies = [...policies]
      .filter(p => p.matchScore >= 75)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 9)
    setFilteredPolicies(sortedPolicies)
  }, [policies])
  
  const targetAmount = filteredPolicies.reduce((sum, p) => {
    const amount = parseFloat(p.amount.replace(/[^\d.]/g, '')) || 0
    return sum + amount
  }, 0)
  
  useEffect(() => {
    setAnimatedAmount(0)
    const duration = 2000
    const steps = 60
    const increment = targetAmount / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= targetAmount) {
        setAnimatedAmount(Math.floor(targetAmount))
        clearInterval(timer)
      } else {
        setAnimatedAmount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [targetAmount])
  
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const deadline = new Date(now.getFullYear(), now.getMonth() + 3, 15).getTime()
      const diff = deadline - now.getTime()
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setCountdown(`${days} 天 ${hours} 小时 ${minutes} 分`)
      }
    }
    updateCountdown()
    const timer = setInterval(updateCountdown, 60000)
    return () => clearInterval(timer)
  }, [])
  
  useEffect(() => {
    let result = [...filteredPolicies]
    
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.industry === selectedCategory)
    }
    
    if (sortBy === 'match') {
      result.sort((a, b) => b.matchScore - a.matchScore)
    } else if (sortBy === 'amount') {
      result.sort((a, b) => {
        const aAmount = parseFloat(a.amount.replace(/[^\d.]/g, '')) || 0
        const bAmount = parseFloat(b.amount.replace(/[^\d.]/g, '')) || 0
        return bAmount - aAmount
      })
    } else if (sortBy === 'deadline') {
      result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    }
    
    setFilteredPolicies(result)
  }, [selectedCategory, sortBy])
  
  const formatAmount = (num) => {
    if (num >= 10000) {
      return `¥${(num / 10000).toFixed(0)}万`
    }
    return `¥${num.toLocaleString()}`
  }
  
  const categories = ['all', ...new Set(policies.map(p => p.industry))].slice(0, 7)
  
  const advantages = [
    '企业资质符合高新技术企业认定标准',
    '研发投入占比达标',
    '拥有自主知识产权',
    '符合软件企业认定条件'
  ]

  const trendData = useMemo(() => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    return months.map((month, index) => ({
      month,
      value: 60 + Math.random() * 40
    }))
  }, [])

  const radarData = [85, 90, 75, 80, 88]
  const radarLabels = ['科技创新', '税收优惠', '财政补贴', '金融支持', '人才政策']

  const getRadarPoints = () => {
    const center = 100
    const maxRadius = 50
    const points = []
    radarData.forEach((value, index) => {
      const angle = (index * 2 * Math.PI) / radarData.length - Math.PI / 2
      const radius = (value / 100) * maxRadius
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      points.push(`${x},${y}`)
    })
    return points.join(' ')
  }
  
  

  return (
    <section className="pt-24 pb-20 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-4 animate-in fade-in zoom-in dark:bg-green-900/30">
            <CheckCircle className="w-4 h-4" />
            <span>匹配分析完成</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 animate-in fade-in slide-in-from-bottom-4">
            {companyName ? `${companyName}的政策匹配报告` : '您的政策匹配报告'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 delay-100">
            基于智能分析，为您精准匹配了以下高价值政策
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatsCard 
            icon={Award} 
            label="预估可获补贴总额" 
            value={formatAmount(animatedAmount)} 
            subtitle="根据匹配政策估算"
          />
          <StatsCard 
            icon={TrendingUp} 
            label="高匹配度政策数量" 
            value={`${filteredPolicies.length} 项`} 
            subtitle="匹配度 ≥ 75%"
          />
          <StatsCard 
            icon={Clock} 
            label="紧急申报倒计时" 
            value={countdown} 
            subtitle="最近截止政策"
          />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-4 delay-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">匹配亮点</h3>
              <div className="flex flex-wrap gap-3">
                {advantages.map((adv, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm animate-in fade-in slide-in-from-bottom-4 dark:bg-green-900/30 dark:border-green-900/50" style={{ animationDelay: `${300 + index * 100}ms` }}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {adv}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 delay-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-[#2563EB]" />
                <span>补贴趋势分析</span>
              </h3>
              <button 
                onClick={() => setShowChart(!showChart)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${showChart ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {showChart && (
              <div className="h-48 flex items-end justify-between gap-2">
                {trendData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-[#2563EB] rounded-t-lg transition-all duration-1000 ease-out"
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-2">{item.month}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 delay-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Radar className="w-5 h-5 text-[#2563EB]" />
              <span>匹配度雷达图</span>
            </h3>
            <svg viewBox="0 0 200 200" className="w-full h-48">
              <g className="opacity-20">
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" className="text-gray-400"/>
                <circle cx="100" cy="100" r="37.5" fill="none" stroke="currentColor" className="text-gray-400"/>
                <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" className="text-gray-400"/>
                <circle cx="100" cy="100" r="12.5" fill="none" stroke="currentColor" className="text-gray-400"/>
                <line x1="100" y1="50" x2="100" y2="150" stroke="currentColor" className="text-gray-400"/>
                <line x1="50" y1="100" x2="150" y2="100" stroke="currentColor" className="text-gray-400"/>
                <line x1="61.8" y1="61.8" x2="138.2" y2="138.2" stroke="currentColor" className="text-gray-400"/>
                <line x1="61.8" y1="138.2" x2="138.2" y2="61.8" stroke="currentColor" className="text-gray-400"/>
              </g>
              <polygon 
                points={getRadarPoints()} 
                fill="rgba(37, 99, 235, 0.2)" 
                stroke="#2563EB" 
                strokeWidth="2"
                className="transition-all duration-1000"
              />
              {radarLabels.map((label, index) => {
                const angle = (index * 2 * Math.PI) / radarLabels.length - Math.PI / 2
                const radius = 60
                const x = 100 + radius * Math.cos(angle)
                const y = 100 + radius * Math.sin(angle)
                return (
                  <text 
                    key={index} 
                    x={x} 
                    y={y} 
                    textAnchor="middle" 
                    fill={theme === 'light' ? lightModeColor : darkModeColor} 
                    fontSize="10"
                  >
                    {label}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#2563EB]" />
            <span>推荐政策列表</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-xs font-medium dark:bg-blue-900/30">
              {filteredPolicies.length}
            </span>
          </h3>
          
          <div className="flex items-center space-x-4">
            {compareList.length > 0 && (
              <button 
                onClick={onCompare}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-[#2563EB] rounded-lg hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:hover:bg-blue-900/40"
              >
                <GitCompare className="w-4 h-4" />
                <span className="text-sm font-medium">对比 {compareList.length} 项</span>
              </button>
            )}
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white text-sm outline-none focus:border-[#2563EB] cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? '全部类型' : cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white text-sm outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="match">匹配度优先</option>
                <option value="amount">金额优先</option>
                <option value="deadline">截止日期</option>
              </select>
            </div>
            
            <button className="text-[#2563EB] hover:text-[#1D4ED8] flex items-center space-x-1 text-sm font-medium transition-colors">
              <span>查看全部</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPolicies.map((policy, index) => (
            <div 
              key={policy.id} 
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${500 + index * 100}ms`, animationDuration: '500ms' }}
            >
              <PolicyCard 
                policy={policy} 
                onClick={() => onPolicyClick(policy)} 
              />
            </div>
          ))}
        </div>
        
        {filteredPolicies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">没有找到匹配的政策</h3>
            <p className="text-gray-400">尝试调整筛选条件或返回首页重新检测</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <button 
            onClick={onGenerateMaterials}
            className="px-8 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>生成完整申报方案</span>
          </button>
          <p className="text-gray-400 text-sm mt-3">一键生成所有匹配政策的申报材料</p>
        </div>
      </div>
    </section>
  )
}

export default Results
