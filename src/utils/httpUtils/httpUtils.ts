export const generateQuery = <T extends Record<string, unknown>>(obj: T) => {
  const queries = Object.keys(obj)
    .map((key) => {
      return `${key}=${obj[key]}`
    })
    .join('&')
  return `?${queries}`
}

export const clearQuery = () =>
  window.history.replaceState({}, document.title, window.location.pathname)
