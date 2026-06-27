import { useEffect, useState } from 'react'

function StatsCard({ icon: Icon, label, value, subtitle }) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#2563EB]" />
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-gray-500 dark:text-gray-400 text-sm">{label}</div>
      {subtitle && <div className="text-gray-400 text-xs mt-1">{subtitle}</div>}
    </div>
  )
}

export default StatsCard
