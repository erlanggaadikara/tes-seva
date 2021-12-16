import { removePageFromQuery } from './urlUtils'

describe('url util test', () => {
  test('should remove page from query string', () => {
    const url = '?a=1&b=2&page=xxx/xxx'
    const proceedURL = removePageFromQuery(url)
    expect(proceedURL).toEqual('a=1&b=2')
  })
})
