import { Clock, FileText, ChevronRight, ExternalLink, GitCompare } from 'lucide-react'
import { useStore } from '../store/useStore'

const categoryColors = {
  '科技创新': 'bg-blue-50 text-[#2563EB] border-blue-200',
  '税收优惠': 'bg-green-50 text-green-600 border-green-200',
  '财政补贴': 'bg-amber-50 text-amber-600 border-amber-200',
  '金融支持': 'bg-purple-50 text-purple-600 border-purple-200',
  '人才政策': 'bg-pink-50 text-pink-600 border-pink-200',
  '其他': 'bg-gray-50 text-gray-600 border-gray-200'
}

function PolicyCard({ policy, onClick }) {
  const { compareList, toggleCompare } = useStore()
  const isSelected = compareList.includes(policy.id)

  const getMatchColor = (rate) => {
    if (rate >= 90) return 'bg-green-500'
    if (rate >= 70) return 'bg-[#2563EB]'
    return 'bg-amber-500'
  }

  const getMatchBadge = (rate) => {
    if (rate >= 90) return { text: '高匹配', color: 'bg-green-50 text-green-600 border-green-200' }
    if (rate >= 70) return { text: '中匹配', color: 'bg-blue-50 text-[#2563EB] border-blue-200' }
    return { text: '待评估', color: 'bg-gray-50 text-gray-600 border-gray-200' }
  }

  const matchBadge = getMatchBadge(policy.matchRate)

  return (
    <div 
      className="group border rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[policy.category] || categoryColors['其他']}`}>
              {policy.category}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${matchBadge.color}`}>
              {matchBadge.text}
            </span>
          </div>
          <h3 className="text-lg font-semibold group-hover:text-[#2563EB] transition-colors line-clamp-2 text-[#1F2329] dark:text-white">
            {policy.name}
          </h3>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <div className="text-2xl font-bold text-[#1F2329] dark:text-white">
            ¥{policy.amount}
          </div>
          <div className="text-xs text-gray-400">预估金额</div>
        </div>
      </div>
      
      <div className="mb-5">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-[#64748B] dark:text-gray-400">匹配度</span>
          <div className="flex items-center space-x-1">
            <span className="text-[#2563EB] font-semibold">{policy.matchRate}%</span>
          </div>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <div 
            className={`h-full ${getMatchColor(policy.matchRate)} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${policy.matchRate}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>截止: {policy.deadline}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              toggleCompare(policy.id)
            }}
            className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-blue-100 text-[#2563EB]' : 'text-gray-400 hover:text-[#2563EB] hover:bg-gray-100 dark:text-gray-500 dark:hover:text-blue-400 dark:hover:bg-gray-700'}`}
            title={isSelected ? '取消对比' : '添加对比'}
          >
            <GitCompare className="w-4 h-4" />
          </button>
          <button 
            className="flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors text-sm bg-gray-50 hover:bg-gray-100 text-[#64748B] hover:text-[#2563EB] dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-blue-400"
            onClick={(e) => {
              e.stopPropagation()
              onClick && onClick()
            }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>详情</span>
          </button>
          <button 
            className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <FileText className="w-4 h-4" />
            <span>智能生成</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PolicyCard
