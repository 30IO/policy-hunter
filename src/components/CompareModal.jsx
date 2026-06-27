import { X, Check, X as XIcon } from 'lucide-react'
import { useStore } from '../store/useStore'
import Card from './ui/Card'
import Button from './ui/Button'

const CompareModal = ({ isOpen, onClose, onPolicyClick }) => {
  const { compareList, policies, clearCompare } = useStore()

  const policiesToCompare = policies.filter(p => compareList.includes(p.id))

  if (!isOpen) return null

  const columns = [
    { key: 'title', label: '政策名称' },
    { key: 'description', label: '政策描述' },
    { key: 'amount', label: '补贴金额' },
    { key: 'industry', label: '适用行业' },
    { key: 'region', label: '适用地区' },
    { key: 'deadline', label: '截止日期' },
    { key: 'matchScore', label: '匹配度' }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl max-h-[80vh] overflow-hidden rounded-2xl border shadow-2xl bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              政策对比
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              已选择 {policiesToCompare.length} 个政策进行对比
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={clearCompare}>
              清空对比
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-auto max-h-[calc(80vh-100px)]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  对比项
                </th>
                {policiesToCompare.map((policy) => (
                  <th key={policy.id} className="p-4 text-center">
                    <Card className="mx-auto max-w-xs cursor-pointer" hover onClick={() => onPolicyClick(policy)}>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {policy.title}
                        </h3>
                        <div className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${policy.matchScore >= 90 ? 'bg-green-50 text-green-600' : policy.matchScore >= 70 ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>
                          <Check className="w-3 h-3" />
                          {policy.matchScore}%
                        </div>
                      </div>
                    </Card>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {columns.map((column) => (
                <tr key={column.key} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                    {column.label}
                  </td>
                  {policiesToCompare.map((policy) => (
                    <td key={policy.id} className="p-4 text-center text-gray-600 dark:text-gray-300">
                      {column.key === 'matchScore' ? (
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${policy.matchScore >= 90 ? 'bg-green-50 text-green-600' : policy.matchScore >= 70 ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>
                          {policy.matchScore}%
                        </div>
                      ) : column.key === 'description' ? (
                        <p className="text-sm max-w-xs mx-auto line-clamp-2">
                          {policy[column.key]}
                        </p>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded-lg text-sm bg-gray-100 dark:bg-gray-700">
                          {policy[column.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  申报材料
                </td>
                {policiesToCompare.map((policy) => (
                  <td key={policy.id} className="p-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      {policy.materials.slice(0, 3).map((material, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          <Check className="w-3 h-3" />
                          {material}
                        </span>
                      ))}
                      {policy.materials.length > 3 && (
                        <span className="px-2 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                          +{policy.materials.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {policiesToCompare.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <XIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">暂无对比政策</p>
            <p className="text-sm mt-2">请在政策列表中选择要对比的政策</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompareModal
