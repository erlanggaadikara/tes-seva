import { useState, useEffect } from 'react'

export enum RequestStatus {
  LOADING = 'LOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export const useRequest = <T>(
  service: () => Promise<T | null>,
  initialData: T | null = null,
) => {
  const [state, setState] = useState({
    status: RequestStatus.LOADING,
    error: null,
    data: initialData,
  })

  const request = async () => {
    try {
      const data = await service()
      setState({ status: RequestStatus.COMPLETED, error: null, data })
    } catch (error) {
      setState({ status: RequestStatus.ERROR, error: error, data: null })
    }
  }

  useEffect(() => {
    request()
  }, [])

  return state
}
