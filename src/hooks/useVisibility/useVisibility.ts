import { useState, useEffect } from 'react'

type VisibilityOptions = {
  root?: Element | Document | null
  threshold?: number
}

export default (
  ref: React.MutableRefObject<HTMLElement>,
  option: VisibilityOptions = { threshold: 0 },
) => {
  const [visible, setVisible] = useState(false)
  const { root, threshold } = option
  useEffect(() => {
    if (ref && ref.current) {
      const element = ref.current
      const ob = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting)
        },
        { root, threshold },
      )
      ob.observe(element)
      return () => {
        ob.unobserve(element)
      }
    }
  }, [])

  return visible
}
