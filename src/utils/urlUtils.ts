export const removePageFromQuery = (queryStr: string) => {
  // eg: ?a=1&b=2&page=xxx/xxx
  return queryStr
    .slice(1) // remove "?"
    .split('&') // convert "a=1&b=2&c=3&page=xxx/xxx" to ["a=1", "b=2", "page=xxx/xxx"]
    .reduce((acc: string[], next: string) => {
      // remove "page=xxx/xxx" out of array
      if (!next.startsWith('page=')) {
        acc.push(next)
      }
      return acc
    }, [])
    .join('&') // convert ["a=1", "b=2"] to "a=1&b=2"
}
