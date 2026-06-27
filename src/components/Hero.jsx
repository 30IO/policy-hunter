import { useState, useRef } from 'react'
import { Search, Upload, ArrowRight, Award, TrendingUp, Sparkles, ChevronDown } from 'lucide-react'
import DropZone from './DropZone'

function Hero({ onSubmit }) {
  const [inputValue, setInputValue] = useState('')
  const dropZoneRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSubmit(inputValue)
    }
  }

  const handleUploadClick = () => {
    dropZoneRef.current?.triggerUpload()
  }

  return (
    <section className="pt-24 pb-28 px-4 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/2 opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#2563EB" strokeWidth="1" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#2563EB" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#2563EB" strokeWidth="1" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="#2563EB" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="#2563EB" strokeWidth="1" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="#2563EB" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] translate-y-1/3 -translate-x-1/3 opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="150" fill="none" stroke="#2563EB" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#2563EB" strokeWidth="1" />
          <circle cx="200" cy="200" r="50" fill="#2563EB" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium dark:bg-blue-900/30">
          <Sparkles className="w-4 h-4" />
          <span>政策匹配 · 精准推荐 · 专业服务</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-6 leading-tight tracking-tight">
          <span className="text-gray-900 dark:text-white">发现政策红利</span>
          <br />
          <span className="text-[#2563EB]">助力企业发展</span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          输入企业名称或上传商业计划书，快速匹配最适合的政策，助您轻松获取政府补贴
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-stretch bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-2 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-900/50 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/10"
               style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03), inset 0 1px 1px rgba(0,0,0,0.02)' }}>
            <div className="flex-1 flex items-center px-6 py-5">
              <Search className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入企业名称，快速匹配政策补贴"
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-base"
              />
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 sm:py-0 border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-gray-700 mt-2 sm:mt-0">
              <button
                type="button"
                onClick={handleUploadClick}
                className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                title="上传文件"
              >
                <Upload className="w-5 h-5 text-gray-400" />
              </button>
              <button
                type="submit"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg flex items-center space-x-2 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <ArrowRight className="w-5 h-5 relative z-10" />
                <span className="relative z-10">立即查询</span>
              </button>
            </div>
          </div>
        </form>

        <div className="max-w-3xl mx-auto">
          <DropZone ref={dropZoneRef} onFileSelected={onSubmit} />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <span>已服务 10,000+ 企业</span>
          </div>
          <div className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
              <Award className="w-4 h-4 text-[#2563EB]" />
            </div>
            <span>累计匹配补贴 50 亿+</span>
          </div>
          <div className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 transition-colors">
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <span>平均匹配率 85%</span>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <a 
            href="#features" 
            className="flex flex-col items-center text-gray-400 hover:text-[#2563EB] transition-colors group"
          >
            <span className="text-sm mb-2">了解更多</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
