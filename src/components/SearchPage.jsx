import { useState, useMemo } from 'react'
import { Search, Filter, X, MapPin, Building2, Heart } from 'lucide-react'
import { useStore } from '../store/useStore'
import Card from './ui/Card'
import Button from './ui/Button'
import { Select } from './ui/Input'
import PolicyModal from './PolicyModal'

const SearchPage = () => {
  const { policies, favorites, toggleFavorite, addToCompare, compareList, theme } = useStore()
  const [keyword, setKeyword] = useState('')
  const [region, setRegion] = useState('')
  const [industry, setIndustry] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState(null)

  const regions = useMemo(() => [...new Set(policies.map(p => p.region))], [policies])
  const industries = useMemo(() => [...new Set(policies.map(p => p.industry))], [policies])

  const filteredPolicies = useMemo(() => {
    return policies.filter(policy => {
      const matchesKeyword = policy.title.toLowerCase().includes(keyword.toLowerCase()) ||
                           policy.description.toLowerCase().includes(keyword.toLowerCase())
      const matchesRegion = !region || policy.region === region
      const matchesIndustry = !industry || policy.industry === industry
      return matchesKeyword && matchesRegion && matchesIndustry
    })
  }, [policies, keyword, region, industry])

  const clearFilters = () => {
    setKeyword('')
    setRegion('')
    setIndustry('')
  }

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            政策搜索
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            按地区、行业筛选适合您的政策
          </p>
        </div>

        <Card className="mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索政策名称或关键词..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="
                    w-full pl-12 pr-4 py-3 rounded-xl border transition-all
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]
                    bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400
                  "
                />
              </div>
              <Button
                variant={showFilters ? 'primary' : 'secondary'}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                筛选
              </Button>
              {(keyword || region || industry) && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                >
                  <X className="w-4 h-4" />
                  清除
                </Button>
              )}
            </div>

            {showFilters && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="地区"
                  options={['', ...regions]}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
                <Select
                  label="行业"
                  options={['', ...industries]}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
            )}
          </div>
        </Card>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            共找到 {filteredPolicies.length} 条政策
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <Card
              key={policy.id}
              hover
              onClick={() => handlePolicyClick(policy)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {policy.industry}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        <MapPin className="w-3 h-3" />
                        {policy.region}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                      {policy.title}
                    </h3>
                    <p className="text-sm line-clamp-2 text-gray-500 dark:text-gray-400">
                      {policy.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-[#2563EB] dark:text-blue-400">
                      {policy.amount}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(policy.id)
                    }}
                    className={`p-2 rounded-lg transition-colors ${favorites.includes(policy.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400'}`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(policy.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPolicies.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              未找到相关政策
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              请尝试调整搜索关键词或筛选条件
            </p>
          </div>
        )}
      </div>

      {selectedPolicy && (
        <PolicyModal
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
          onAddCompare={() => addToCompare(selectedPolicy)}
          isCompared={compareList.some(p => p.id === selectedPolicy.id)}
        />
      )}
    </div>
  )
}

export default SearchPage