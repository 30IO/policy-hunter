import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Upload, FileText, FileCheck, Loader2 } from 'lucide-react'

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.doc', '.ppt', '.pptx']

const DropZone = forwardRef(function DropZone({ onFileSelected }, ref) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState('')
  const dragCounter = useRef(0)
  const fileInputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    triggerUpload: () => fileInputRef.current?.click()
  }))

  const validateFile = (file) => {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return '不支持的文件格式，请上传 PDF、DOCX 或 PPT 文件'
    }
    if (file.size > 50 * 1024 * 1024) {
      return '文件大小超过限制（最大 50MB）'
    }
    return null
  }

  const handleFile = async (file) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setSelectedFile(file)
    setIsUploading(true)
    setUploadProgress(0)

    const duration = 2500
    const steps = 50
    const increment = 100 / steps
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + increment
      })
    }, duration / steps)

    await new Promise(resolve => setTimeout(resolve, duration))
    clearInterval(interval)

    onFileSelected(file.name)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    setIsDragging(true)
    setError('')
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current = 0
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFile(files[0])
    }
    e.target.value = ''
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      {isUploading ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-[#2563EB] animate-spin" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white font-medium text-sm">{selectedFile?.name}</span>
              </div>
              <p className="text-[#2563EB] text-sm mb-3">正在深度解析文档...</p>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2563EB] rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-xs mt-2">{Math.round(uploadProgress)}%</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`
            relative bg-gray-50 dark:bg-gray-900 rounded-xl border-2 
            transition-all duration-300 cursor-pointer
            ${isDragging 
              ? 'border-[#2563EB] bg-blue-50 dark:bg-blue-900/20 shadow-md' 
              : 'border-dashed border-gray-300 dark:border-gray-600 hover:border-[#2563EB]'
            }
          `}
        >
          {isDragging && (
            <div className="absolute inset-0 rounded-xl border-2 border-dashed border-[#2563EB]"></div>
          )}
          
          <div className="p-5 text-center">
            <div className={`
              w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center
              transition-all duration-300
              ${isDragging 
                ? 'bg-blue-100 scale-110' 
                : 'bg-white dark:bg-gray-800'
              }
            `}>
              <Upload className={`w-6 h-6 ${isDragging ? 'text-[#2563EB]' : 'text-gray-400'} transition-colors`} />
            </div>
            
            <h3 className={`
              text-sm font-semibold mb-2 transition-colors
              ${isDragging ? 'text-[#2563EB]' : 'text-gray-900 dark:text-white'}
            `}>
              {isDragging ? '松开以上传文件' : '拖拽 BP / 商业计划书到此处'}
            </h3>
            
            <p className="text-gray-400 text-xs mb-3">
              或点击选择文件 · 支持 PDF、DOCX、PPT · 最大 50MB
            </p>
            
            {error && (
              <p className="text-red-500 text-xs animate-in fade-in">{error}</p>
            )}
            
            <button className="inline-flex items-center space-x-2 px-5 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#2563EB] text-gray-500 dark:text-gray-300 hover:text-[#2563EB] transition-all duration-200 text-sm">
              <FileCheck className="w-4 h-4" />
              <span>选择文件</span>
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.ppt,.pptx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
})

export default DropZone
