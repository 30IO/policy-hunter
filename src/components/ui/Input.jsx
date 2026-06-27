const Input = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]
          placeholder:text-gray-400
          bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100
          ${error ? 'border-red-400 focus:border-red-400' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export const Textarea = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]
          placeholder:text-gray-400 resize-none
          bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100
          ${error ? 'border-red-400 focus:border-red-400' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export const Select = ({
  label,
  options = [],
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]
          appearance-none bg-no-repeat bg-right cursor-pointer
          bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Input
