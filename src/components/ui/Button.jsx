import { useStore } from '../../store/useStore'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const { theme } = useStore()

  const variants = {
    primary: {
      light: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:scale-95',
      dark: 'bg-[#3B82F6] text-white hover:bg-[#2563EB] active:scale-95'
    },
    secondary: {
      light: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      dark: 'bg-gray-700 text-gray-200 hover:bg-gray-600'
    },
    outline: {
      light: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
      dark: 'border border-gray-600 text-gray-200 hover:bg-gray-700'
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
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
