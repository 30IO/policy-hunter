import { useStore } from '../../store/useStore'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const { theme } = useStore()

  const variants = {
    primary: {
      light: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-blue-500/25 active:scale-95',
      dark: 'bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:shadow-lg hover:shadow-blue-500/25 active:scale-95'
    },
    secondary: {
      light: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95',
      dark: 'bg-gray-700 text-gray-200 hover:bg-gray-600 active:scale-95'
    },
    outline: {
      light: 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-95',
      dark: 'border border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500 active:scale-95'
    },
    ghost: {
      light: 'text-gray-600 hover:bg-gray-100',
      dark: 'text-gray-300 hover:bg-gray-700'
    }
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const spinnerSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-xl
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variants[variant][theme]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className={`${spinnerSizes[size]} border-2 border-current border-t-transparent rounded-full animate-spin`} />
          <span className="opacity-70">处理中</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
