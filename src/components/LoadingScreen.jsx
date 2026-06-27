import { useState, useEffect } from 'react'
import { Radar, Sparkles, Search, Bot, BarChart3 } from 'lucide-react'

function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const steps = [
    { icon: Search, text: '正在检索企业基础工商信息...' },
    { icon: Bot, text: '正在解析企业核心业务场景...' },
    { icon: BarChart3, text: '正在匹配 2026 最新各级政府政策补贴库...' }
  ]

  useEffect(() => {
    if (currentStep >= steps.length) {
      setIsComplete(true)
      return
    }

    const currentStepData = steps[currentStep]
    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (charIndex <= currentStepData.text.length) {
        setDisplayText(currentStepData.text.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentStep(prev => prev + 1)
        }, 600)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [currentStep])

  const progress = Math.min(((currentStep + (displayText.length / steps[currentStep]?.text.length)) / steps.length) * 100, 100)
  const CurrentIcon = steps[currentStep]?.icon || Radar

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#2563EB] rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-4 border-4 border-transparent border-b-[#2563EB] rounded-full" 
               style={{ animation: 'spin 2s linear infinite', animationDirection: 'reverse' }}></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <CurrentIcon className="w-8 h-8 text-[#2563EB] animate-pulse" />
            </div>
          </div>
          
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center animate-bounce">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-[#1F2329] mb-4 animate-in fade-in slide-in-from-bottom-4">
          匹配分析中
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center min-h-[2rem]">
            <p className="text-[#64748B] text-sm animate-fade-in">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          <div className="w-80 h-2 bg-gray-100 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-[#2563EB] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-[#2563EB] font-semibold animate-in fade-in slide-in-from-bottom-4 delay-200">
            {Math.round(progress)}%
          </p>
        </div>
        
        <div className="mt-8 flex justify-center space-x-3">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-[#2563EB] scale-125' 
                  : index === currentStep 
                    ? 'bg-[#2563EB]/70 animate-pulse' 
                    : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen