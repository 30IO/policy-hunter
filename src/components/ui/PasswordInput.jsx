import { useState, useEffect } from 'react'
import { Eye, EyeOff, CheckCircle2, XCircle, Shield } from 'lucide-react'

function PasswordInput({ 
  label, 
  value, 
  onChange, 
  placeholder = '请输入密码',
  error,
  confirmValue = '',
  isConfirm = false,
  className = ''
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [strengthLabel, setStrengthLabel] = useState('')
  const [isMatching, setIsMatching] = useState(null)

  useEffect(() => {
    if (value) {
      let score = 0
      if (value.length >= 8) score += 25
      if (value.length >= 12) score += 10
      if (/[a-z]/.test(value)) score += 15
      if (/[A-Z]/.test(value)) score += 15
      if (/[0-9]/.test(value)) score += 15
      if (/[^a-zA-Z0-9]/.test(value)) score += 20
      
      setPasswordStrength(Math.min(100, score))
      
      if (score < 30) setStrengthLabel('弱')
      else if (score < 50) setStrengthLabel('较差')
      else if (score < 70) setStrengthLabel('一般')
      else if (score < 90) setStrengthLabel('良好')
      else setStrengthLabel('强')
    } else {
      setPasswordStrength(0)
      setStrengthLabel('')
    }
  }, [value])

  useEffect(() => {
    if (isConfirm && confirmValue) {
      setIsMatching(value === confirmValue)
    } else {
      setIsMatching(null)
    }
  }, [isConfirm, confirmValue, value])

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200 dark:bg-gray-700'
    if (passwordStrength < 30) return 'bg-red-500'
    if (passwordStrength < 50) return 'bg-orange-500'
    if (passwordStrength < 70) return 'bg-yellow-500'
    if (passwordStrength < 90) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthTextColor = () => {
    if (passwordStrength === 0) return 'text-gray-400'
    if (passwordStrength < 30) return 'text-red-500'
    if (passwordStrength < 50) return 'text-orange-500'
    if (passwordStrength < 70) return 'text-yellow-500'
    if (passwordStrength < 90) return 'text-blue-500'
    return 'text-green-500'
  }

  const getBorderColor = () => {
    if (error) return 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
    if (isConfirm) {
      if (isMatching === true) return 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'
      if (isMatching === false && value) return 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
    }
    return 'border-gray-200 dark:border-gray-700 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        {label}
        {!isConfirm && <Shield className="w-4 h-4 text-gray-400" />}
      </label>
      
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-16 py-3.5 bg-gray-50 dark:bg-gray-900 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all duration-300 ${getBorderColor()}`}
          autoComplete={isConfirm ? 'new-password' : 'new-password'}
        />
        
        {!isConfirm && focused && value && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center">
            <span className={`text-xs font-medium ${getStrengthTextColor()}`}>
              {strengthLabel}
            </span>
          </div>
        )}
        
        {isConfirm && value && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2">
            {isMatching === true ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 animate-[zoom-in_0.3s_ease-out]" />
            ) : isMatching === false ? (
              <XCircle className="w-5 h-5 text-red-500 animate-[shake_0.4s_ease-out]" />
            ) : null}
          </div>
        )}
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          aria-label={showPassword ? '隐藏密码' : '显示密码'}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
      
      {!isConfirm && (focused || value) && !error && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-400">密码强度</span>
            <span className={`text-xs font-medium ${getStrengthTextColor()}`}>
              {strengthLabel || '请输入密码'}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getStrengthColor()} transition-all duration-500 ease-out rounded-full`}
              style={{ width: `${passwordStrength}%` }}
            />
          </div>
          <div className="flex gap-3 mt-2">
            <span className={`text-xs ${value.length >= 8 ? 'text-green-500' : 'text-gray-400'} flex items-center gap-1`}>
              {value.length >= 8 ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full bg-gray-200" />}
              8位以上
            </span>
            <span className={`text-xs ${/[a-zA-Z]/.test(value) ? 'text-green-500' : 'text-gray-400'} flex items-center gap-1`}>
              {/[a-zA-Z]/.test(value) ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full bg-gray-200" />}
              字母
            </span>
            <span className={`text-xs ${/[0-9]/.test(value) ? 'text-green-500' : 'text-gray-400'} flex items-center gap-1`}>
              {/[0-9]/.test(value) ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full bg-gray-200" />}
              数字
            </span>
          </div>
        </div>
      )}
      
      {isConfirm && isMatching !== null && !error && (
        <div className={`mt-2 text-xs flex items-center gap-1.5 ${isMatching ? 'text-green-500' : 'text-red-500'}`}>
          {isMatching ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              密码匹配
            </>
          ) : (
            <>
              <XCircle className="w-3.5 h-3.5" />
              两次输入的密码不一致
            </>
          )}
        </div>
      )}
      
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  )
}

export default PasswordInput