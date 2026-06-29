import { useState, useEffect, useRef } from 'react'
import { Zap, Shield, Clock, Headphones, Database, BarChart3, Globe, Lock, TrendingUp, Target, Lightbulb, Award } from 'lucide-react'

function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  const features = [
    {
      icon: Target,
      title: '精准匹配',
      description: '多维度分析企业资质，精准匹配最适合的政策',
      delay: '0ms'
    },
    {
      icon: Database,
      title: '海量政策库',
      description: '覆盖全国各省市，收录最新政策文件',
      delay: '150ms'
    },
    {
      icon: BarChart3,
      title: '智能推荐',
      description: '基于企业信息，推荐高匹配度政策',
      delay: '300ms'
    },
    {
      icon: Clock,
      title: '实时更新',
      description: '政策库每日更新，确保信息及时准确',
      delay: '450ms'
    },
    {
      icon: Headphones,
      title: '专业指导',
      description: '资深政策专家一对一指导申报流程',
      delay: '600ms'
    },
    {
      icon: Shield,
      title: '安全保障',
      description: '企业数据加密存储，严格遵守数据保护法规',
      delay: '750ms'
    }
  ]

  return (
    <section ref={sectionRef} id="features" className="py-24 px-4 relative overflow-hidden bg-white dark:bg-gray-800">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700"></div>
      
      <div className="absolute top-20 right-10 w-[300px] h-[300px] opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M0 100 Q50 50 100 100 T200 100" fill="none" stroke="#2563EB" strokeWidth="2" />
          <path d="M0 120 Q50 70 100 120 T200 120" fill="none" stroke="#2563EB" strokeWidth="2" />
          <path d="M0 80 Q50 30 100 80 T200 80" fill="none" stroke="#2563EB" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-2 rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium mb-4 transition-all duration-700 dark:bg-blue-900/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            核心功能
          </span>
          <h2 className={`text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            六大核心优势
          </h2>
          <p className={`text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base sm:text-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            全方位政策服务能力，助力企业精准获取政策红利
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 ${isVisible ? 'opacity-100 translate-y-0 shadow-sm' : 'opacity-0 translate-y-8'}`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 50}ms`
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-5 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-[#2563EB] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#2563EB] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
