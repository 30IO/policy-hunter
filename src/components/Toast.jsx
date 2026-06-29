import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useStore } from '../store/useStore'

const Toast = () => {
  const { toast, hideToast } = useStore()
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (toast) {
      setProgress(100)
      const duration = 3000
      const interval = 30
      const decrement = 100 / (duration / interval)
      
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev <= 0) {
            clearInterval(timer)
            hideToast()
            return 0
          }
          return prev - decrement
        })
      }, interval)

      return () => clearInterval(timer)
    }
  }, [toast, hideToast])

  if (!toast) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  }

  const bgColors = {
    success: 'border-green-200 dark:border-green-900/50',
    error: 'border-red-200 dark:border-red-900/50',
    warning: 'border-yellow-200 dark:border-yellow-900/50',
    info: 'border-blue-200 dark:border-blue-900/50'
  }

  const progressColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      <div
        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg shadow-black/5 transition-all duration-300 hover:shadow-xl ${bgColors[toast.type] || bgColors.info}`}
        style={{ animation: 'slideInRight 0.3s ease-out' }}
      >
        <div 
          className={`absolute bottom-0 left-0 h-0.5 rounded-b-xl ${progressColors[toast.type] || progressColors.info} transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
        
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium flex-1">{toast.message}</span>
        <button
          onClick={hideToast}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
        >
          <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
        </button>
      </div>
    </div>
  )
}

export default Toast