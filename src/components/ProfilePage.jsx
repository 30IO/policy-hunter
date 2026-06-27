import { useState } from 'react'
import { User, Heart, History, Settings, Edit3, Save, Calendar, MapPin, Briefcase, Mail, Phone, LogIn, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'
import Card from './ui/Card'
import Button from './ui/Button'

const ProfilePage = ({ onPolicyClick, onLoginClick }) => {
  const { user, favorites, history, policies, toggleFavorite, logout, showToast } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(user || {})

  const favoritePolicies = policies.filter(p => favorites.includes(p.id))

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  const handleSave = () => {
    showToast('个人信息已更新', 'success')
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    showToast('已退出登录', 'info')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <User className="w-8 h-8 text-[#2563EB] dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            请先登录
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            登录后即可管理您的政策收藏和浏览记录
          </p>
          <Button onClick={onLoginClick} className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            立即登录
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            个人中心
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            管理您的政策收藏和浏览记录
          </p>
        </div>

        <Card className="mb-8">
          <div className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-50 dark:bg-blue-900/30">
                <User className="w-10 h-10 text-[#2563EB] dark:text-blue-400" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
                    />
                    <input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4" />
                        保存
                      </Button>
                      <Button variant="ghost" onClick={() => setIsEditing(false)}>
                        取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user?.name || '用户'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {user?.email || ''}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit3 className="w-4 h-4" />
                        编辑资料
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleLogout}>
                        退出登录
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {!isEditing && (
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {favoritePolicies.length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">收藏政策</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {history.length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">浏览记录</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {policies.length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">全部政策</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                我的收藏 ({favoritePolicies.length})
              </h3>
            </div>
            
            {favoritePolicies.length > 0 ? (
              <div className="space-y-3">
                {favoritePolicies.map((policy) => (
                  <Card key={policy.id} hover onClick={() => onPolicyClick(policy)}>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {policy.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {policy.region} · {policy.amount}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(policy.id)
                          }}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-30 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">暂无收藏的政策</p>
              </Card>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <History className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                浏览记录 ({history.length})
              </h3>
            </div>
            
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((item) => {
                  const policy = policies.find(p => p.id === item.id)
                  return (
                    <Card key={item.id + item.timestamp} hover onClick={() => policy && onPolicyClick(policy)}>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h4>
                            <p className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              {formatTime(item.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <History className="w-12 h-12 mx-auto mb-4 opacity-30 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">暂无浏览记录</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage