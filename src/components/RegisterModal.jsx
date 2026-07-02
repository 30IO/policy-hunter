import { useState } from 'react'
import { X, Mail, User, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import PasswordInput from './ui/PasswordInput'

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [agreed, setAgreed] = useState(false)
  const [socialLoading, setSocialLoading] = useState('')

  const handleSocialRegister = async (platform) => {
    setSocialLoading(platform)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSocialLoading('')
    alert(`${platform}注册功能开发中，敬请期待！`)
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入用户名'
    } else if (formData.name.length < 2) {
      newErrors.name = '用户名至少需要2个字符'
    }
    
    if (!formData.email) {
      newErrors.email = '请输入邮箱地址'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    
    if (!formData.password) {
      newErrors.password = '请输入密码'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致'
    }
    
    if (!agreed) {
      newErrors.agreed = '请同意服务条款和隐私政策'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    
    onRegister({
      email: formData.email,
      name: formData.name,
      avatar: null
    })
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-md max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">创建账号</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">注册后即可使用企服雷达的全部功能</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">用户名</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="请输入用户名"
                  className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all ${
                    errors.name ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 dark:border-gray-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">邮箱地址</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="请输入邮箱地址"
                  className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all ${
                    errors.email ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 dark:border-gray-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <PasswordInput
              label="密码"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              placeholder="请输入密码（8位以上，包含字母和数字）"
              error={errors.password}
            />

            <PasswordInput
              label="确认密码"
              value={formData.confirmPassword}
              onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
              placeholder="请再次输入密码"
              error={errors.confirmPassword}
              confirmValue={formData.password}
              isConfirm
            />

            <div className="flex items-start space-x-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked)
                    if (e.target.checked) {
                      setErrors(prev => ({ ...prev, agreed: '' }))
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]/20"
                />
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                  我已阅读并同意
                  <a href="#" className="text-[#2563EB] hover:text-[#1D4ED8]">服务条款</a>
                  和
                  <a href="#" className="text-[#2563EB] hover:text-[#1D4ED8]">隐私政策</a>
                </span>
              </label>
            </div>
            {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>注册中...</span>
                </>
              ) : (
                <>
                  <span>注册</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              已有账号？{' '}
              <button 
                onClick={onSwitchToLogin}
                className="text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors"
              >
                立即登录
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-400">其他注册方式</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-3">
              <button 
                onClick={() => handleSocialRegister('微信')}
                disabled={socialLoading === '微信'}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-70"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-2">
                  {socialLoading === '微信' ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.322-1.223a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">微信</span>
              </button>
              <button 
                onClick={() => handleSocialRegister('企业微信')}
                disabled={socialLoading === '企业微信'}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-70"
              >
                <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center mb-2">
                  {socialLoading === '企业微信' ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">企业微信</span>
              </button>
              <button 
                onClick={() => handleSocialRegister('GitHub')}
                disabled={socialLoading === 'GitHub'}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-70"
              >
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                  {socialLoading === 'GitHub' ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.64 6.8c-.15 1.58-.8 3.1-1.9 4.3-1.13 1.2-2.64 2.1-4.4 2.1-1.78 0-3.32-.9-4.45-2.1C5.25 9.9 4.6 8.36 4.46 6.8c-.14-1.52.42-3.02 1.52-4.2 1.12-1.18 2.68-2.06 4.48-2.06 1.78 0 3.36.86 4.48 2.06 1.1 1.18 1.66 2.68 1.52 4.2zm-2.24 13.2c-.09-.6-.35-1.16-.7-1.65-.88-1.18-2.32-1.93-3.92-1.93-1.58 0-3.02.75-3.9 1.93-.35.49-.61 1.05-.7 1.65h9.44z"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal