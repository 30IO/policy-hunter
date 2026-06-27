import { X, Clock, CheckCircle, AlertCircle, FileText, ExternalLink, Download } from 'lucide-react'

const categoryColors = {
  '科技创新': 'bg-blue-50 text-[#2563EB] border-blue-200 dark:bg-blue-900/30 dark:border-blue-900/50',
  '税收优惠': 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:border-green-900/50',
  '财政补贴': 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:border-amber-900/50',
  '金融支持': 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/30 dark:border-purple-900/50',
  '人才政策': 'bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-900/30 dark:border-pink-900/50',
  '其他': 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:border-gray-600'
}

function PolicyModal({ policy, onClose, onGenerateMaterials }) {
  const getMatchColor = (rate) => {
    if (rate >= 90) return 'bg-green-500'
    if (rate >= 70) return 'bg-[#2563EB]'
    return 'bg-amber-500'
  }
  
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/98 dark:bg-gray-800/98 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between z-10">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-2 ${categoryColors[policy.category] || categoryColors['其他']}`}>
              {policy.category}
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{policy.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">¥{policy.amount}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">预估补贴金额</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                <span className={getMatchColor(policy.matchRate)} style={{ color: getMatchColor(policy.matchRate) }}>
                  {policy.matchRate}%
                </span>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">政策匹配度</div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5">
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="text-gray-500 dark:text-gray-400">匹配度进度</span>
              <span className="text-[#2563EB] font-semibold">{policy.matchRate}%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getMatchColor(policy.matchRate)} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${policy.matchRate}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>企业优势</span>
            </h3>
            <ul className="space-y-3">
              {policy.advantages?.map((adv, index) => (
                <li key={index} className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm">{adv}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>待改进项</span>
            </h3>
            <ul className="space-y-3">
              {policy.disadvantages?.map((disadv, index) => (
                <li key={index} className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-sm">{disadv}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#2563EB]" />
              <span>申报截止日期</span>
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 flex items-center space-x-3">
              <Clock className="w-6 h-6 text-[#2563EB]" />
              <div>
                <div className="text-gray-900 dark:text-white font-semibold">{policy.deadline}</div>
                <div className="text-gray-400 text-sm">请在截止日期前完成申报</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">行动建议</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <p className="text-gray-900 dark:text-white text-sm leading-relaxed">
                {policy.action建议 || '建议尽快准备申报材料，重点关注企业优势部分，同时补足待改进项。如有疑问，可联系专业顾问获取一对一指导。'}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-200">
              <ExternalLink className="w-5 h-5" />
              <span>查看政策原文</span>
            </button>
            <button 
              onClick={onGenerateMaterials}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FileText className="w-5 h-5" />
              <span>生成申报材料</span>
            </button>
          </div>
          
          <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-200">
            <Download className="w-5 h-5" />
            <span>下载政策详情PDF</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PolicyModal
