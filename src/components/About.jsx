import { useRef } from 'react'
import { MapPin, Users, Award, TrendingUp, Building2, Target, Heart } from 'lucide-react'
import useCountUp from '../hooks/useCountUp'

function StatCard({ icon: Icon, end, suffix, label, delay }) {
  const { ref, display } = useCountUp(end, { 
    duration: 2500, 
    suffix,
    formatter: (num) => {
      if (num >= 10000) {
        return Math.round(num).toLocaleString()
      }
      return Math.round(num).toString()
    }
  })

  return (
    <div 
      ref={ref}
      className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: delay }}
    >
      <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Icon className="w-7 h-7 text-[#2563EB] relative z-10" />
      </div>
      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{display}</div>
      <div className="text-gray-500 dark:text-gray-400 text-sm">{label}</div>
    </div>
  )
}

function About() {
  const stats = [
    { icon: MapPin, end: 50, suffix: '+', label: '政策覆盖城市', delay: '0ms' },
    { icon: Users, end: 10000, suffix: '+', label: '服务企业数', delay: '100ms' },
    { icon: Award, end: 50, suffix: '亿+', label: '累计匹配补贴', delay: '200ms' },
    { icon: TrendingUp, end: 98, suffix: '%', label: '客户满意度', delay: '300ms' }
  ]

  const partners = [
    { name: '科技局', icon: Building2 },
    { name: '财政局', icon: Building2 },
    { name: '税务局', icon: Building2 },
    { name: '人社局', icon: Building2 }
  ]

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700"></div>
      
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.03] -translate-y-1/4 translate-x-1/4">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <circle cx="150" cy="150" r="120" fill="none" stroke="#2563EB" strokeWidth="1" />
          <circle cx="150" cy="150" r="80" fill="none" stroke="#2563EB" strokeWidth="1" />
          <circle cx="150" cy="150" r="40" fill="none" stroke="#2563EB" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium mb-4 dark:bg-blue-900/30">
            关于我们
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            让政策红利惠及每一家企业
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
            企服雷达专注于政策补贴匹配服务，我们的使命是让每一家企业都能轻松获取应有的政策红利。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              icon={stat.icon}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 text-center">我们的价值观</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors duration-300">
                <Target className="w-7 h-7 text-[#2563EB] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">精准匹配</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm">智能算法匹配，精准推荐最适合的政策</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors duration-300">
                <Heart className="w-7 h-7 text-[#2563EB] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">专业服务</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm">资深政策专家一对一指导申报流程</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors duration-300">
                <TrendingUp className="w-7 h-7 text-[#2563EB] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">持续创新</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm">不断优化算法，提升匹配准确率</p>
            </div>
          </div>
        </div>

        <div className="text-center animate-in fade-in slide-in-from-bottom-4 delay-300">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-6">合作伙伴</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <partner.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
