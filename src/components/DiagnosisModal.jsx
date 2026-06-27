import { X, Sparkles, TrendingUp, Award, ArrowRight, CheckCircle } from 'lucide-react'

const diagnosisData = {
  matchRate: 88,
  estimatedSubsidy: 150000,
  policies: [
    {
      id: 1,
      name: '高新技术企业认定补贴',
      matchRate: 95,
      amount: '500,000',
      category: '科技创新'
    },
    {
      id: 2,
      name: '软件企业增值税即征即退',
      matchRate: 88,
      amount: '280,000',
      category: '税收优惠'
    },
    {
      id: 3,
      name: '研发费用加计扣除',
      matchRate: 92,
      amount: '150,000',
      category: '税收优惠'
    }
  ]
}

const categoryColors = {
  '科技创新': 'bg-blue-50 text-[#2563EB] border-blue-200',
  '税收优惠': 'bg-green-50 text-green-600 border-green-200',
  '财政补贴': 'bg-amber-50 text-amber-600 border-amber-200',
  '金融支持': 'bg-purple-50 text-purple-600 border-purple-200',
  '人才政策': 'bg-pink-50 text-pink-600 border-pink-200',
  '其他': 'bg-gray-50 text-gray-600 border-gray-200'
}

function DiagnosisModal({ companyName, onViewReport, onClose }) {
  const formatAmount = (num) => {
    return `¥${num.toLocaleString()}`
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl border border-gray-200 w-full max-w-lg overflow-hidden shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl"></div>
          
          <div className="relative p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-[#2563EB]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2329] mb-2">政策匹配简报</h2>
            {companyName && (
              <p className="text-[#64748B] text-sm">基于「{companyName}」的智能分析结果</p>
            )}
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F8F9FA] rounded-xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-[#1F2329] mb-1">
                {diagnosisData.matchRate}%
              </div>
              <div className="text-[#64748B] text-sm">政策匹配度</div>
              <div className="mt-3 flex items-center justify-center space-x-1 text-green-600 text-xs">
                <CheckCircle className="w-3 h-3" />
                <span>高匹配度</span>
              </div>
            </div>
            
            <div className="bg-[#F8F9FA] rounded-xl p-6 text-center">
              <Award className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#1F2329] mb-1">
                {formatAmount(diagnosisData.estimatedSubsidy)}
              </div>
              <div className="text-[#64748B] text-sm">预估可申领补贴</div>
              <div className="mt-3 flex items-center justify-center space-x-1 text-amber-600 text-xs">
                <CheckCircle className="w-3 h-3" />
                <span>潜力巨大</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#1F2329] mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
              <span>推荐政策</span>
            </h3>
            <div className="space-y-3">
              {diagnosisData.policies.map((policy, index) => (
                <div 
                  key={policy.id} 
                  className="bg-[#F8F9FA] rounded-xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${categoryColors[policy.category] || categoryColors['其他']}`}>
                        {policy.category}
                      </span>
                      <span className="text-xs text-[#2563EB] font-medium">{policy.matchRate}% 匹配</span>
                    </div>
                    <h4 className="text-[#1F2329] font-medium text-sm">{policy.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-[#2563EB] font-semibold">¥{policy.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onViewReport}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>查看完整报告</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onClose}
            className="w-full flex items-center justify-center px-6 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#64748B] hover:text-[#1F2329] font-medium transition-all duration-200"
          >
            <span>稍后查看</span>
          </button>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>
    </div>
  )
}

export default DiagnosisModal