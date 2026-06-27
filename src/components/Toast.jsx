import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useStore } from '../store/useStore'

const Toast = () => {
  const { toast, hideToast, theme } = useStore()

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => hideToast(), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast, hideToast])

  if (!toast) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 shadow-lg animate-[slideIn_0.3s_ease-out]"
        style={{ animation: 'slideIn 0.3s ease-out' }}
      >
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium">{toast.message}</span>
        <button
          onClick={hideToast}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast