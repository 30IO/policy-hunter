import { useState, useEffect, useRef, useCallback } from 'react'

function useCountUp(end, { duration = 2000, suffix = '', prefix = '', formatter } = {}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const animationRef = useRef(null)

  const formatNumber = useCallback((num) => {
    if (formatter) return formatter(num)
    if (num >= 10000) {
      return num.toLocaleString()
    }
    return Math.round(num).toString()
  }, [formatter])

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          startAnimation()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [end, duration, hasStarted])

  const startAnimation = useCallback(() => {
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const currentValue = easeOutQuart * end
      setCount(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [end, duration])

  const displayValue = formatNumber(count)

  return {
    ref,
    display: `${prefix}${displayValue}${suffix}`
  }
}

export default useCountUp