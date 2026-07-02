import { useState, useEffect, useMemo } from 'react'
// PasswordInput component with real-time strength detection and character-level comparison
import { Eye, EyeOff, CheckCircle2, XCircle, Shield, AlertCircle } from 'lucide-react'

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

  const charactersMatch = useMemo(() => {
    if (!isConfirm || !confirmValue) return []
    return confirmValue.split('').map((char, index) => ({
      char,
      inputChar: value[index],
      isMatch: value[index] === char,
      isCurrent: index === value.length,
      hasInput: !!value[index]
    }))
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
      
      {isConfirm && confirmValue && (
        <div className="mt-2">
          <div className={`text-xs flex items-center gap-1.5 ${isMatching ? 'text-green-500' : 'text-red-500'} mb-2`}>
            {isMatching ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                密码匹配
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5" />
                两次输入的密码不一致，请检查以下字符
              </>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {charactersMatch.map((item, index) => (
              <div key={index} className="relative group">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs transition-all duration-200 ${
                    item.isCurrent && !item.hasInput
                      ? 'bg-blue-500 text-white animate-pulse'
                      : item.isMatch
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}
                >
                  {item.isCurrent && !item.hasInput ? (
                    ''
                  ) : item.isMatch ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : item.hasInput ? (
                    <XCircle className="w-3.5 h-3.5" />
                  ) : (
                    ''
                  )}
                </span>
                
                {item.isCurrent && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    第 {index + 1} 位
                  </div>
                )}
                
                {!item.isMatch && item.hasInput && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    第 {index + 1} 位不匹配
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {value.length > confirmValue.length && (
            <p className="text-xs text-orange-500 mt-1">
              确认密码超出了原始密码长度
            </p>
          )}
        </div>
      )}
      
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  )
}

export default PasswordInput