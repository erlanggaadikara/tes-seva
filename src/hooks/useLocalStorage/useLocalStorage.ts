import { useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: ((newValue: T) => T) | T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }
  const removeValue = () => {
    setStoredValue(null)
    window.localStorage.removeItem(key)
  }
  return [storedValue, setValue, removeValue]
}
