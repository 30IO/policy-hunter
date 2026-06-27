import { useState, useEffect } from 'react'
import { X, FileText, CheckCircle, Download, Sparkles } from 'lucide-react'

function MaterialsModal({ onClose, policy }) {
  const [materials, setMaterials] = useState([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  
  const materialList = [
    '企业基本信息表',
    '政策匹配分析报告',
    '申报材料清单',
    '可行性研究报告',
    '财务报表',
    '资质证明文件',
    '项目计划书',
    '专家评审意见'
  ]
  
  useEffect(() => {
    materialList.forEach((material, index) => {
      setTimeout(() => {
        setMaterials(prev => [...prev, { name: material, completed: true }])
        
        if (index === materialList.length - 1) {
          setTimeout(() => {
            setIsGenerating(false)
            setIsComplete(true)
          }, 500)
        }
      }, 200 * index + 500)
    })
  }, [])
  
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/98 backdrop-blur-xl border-b border-gray-100 p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-[#1F2329] flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-[#2563EB]" />
            <span>生成申报材料</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          {isGenerating && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-5 h-5 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-400">正在生成申报材料...</span>
            </div>
          )}
          
          <div className="space-y-3">
            {materials.map((material, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <div className="text-[#1F2329] font-medium">{material.name}</div>
                  <div className="text-green-600 text-sm flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>生成完成</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-400 hover:text-[#2563EB]" />
                </button>
              </div>
            ))}
            
            {!isComplete && materials.length < materialList.length && (
              <>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 animate-shimmer">
                    <div className="w-10 h-10 rounded-xl bg-gray-100"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          {isComplete && (
            <div className="mt-6">
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-[#1F2329] font-semibold">所有材料已生成完成</div>
                    <div className="text-gray-400 text-sm">您可以下载完整的申报材料包</div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>下载完整材料包</span>
              </button>
              
              <p className="text-center text-gray-400 text-sm mt-3">
                材料将以 ZIP 压缩包形式下载
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MaterialsModal