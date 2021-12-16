import { useLocation } from 'react-router-dom'

export const useQuery = <T>(keys: string[]): T => {
  const params = new URLSearchParams(useLocation().search)

  const result = keys.reduce((acc, current) => {
    return { ...acc, ...{ [current]: params.get(current) } }
  }, {}) as T
  return result
}
