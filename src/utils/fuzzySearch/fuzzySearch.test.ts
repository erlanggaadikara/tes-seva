import { fuzzySearch } from './fuzzySearch'

describe('#fuzzySearch', () => {
  test('should get the fuzzy search result with no case sensitive', () => {
    const sourceData = [
      {
        value: 'ACEH BARAT',
        label: 'ACEH BARAT',
      },
      {
        value: 'New York',
        label: 'New_York',
      },
    ]
    const ACEH = fuzzySearch('AC', sourceData, ['label'])
    expect(ACEH).toEqual([{ label: 'ACEH BARAT', value: 'ACEH BARAT' }])
    const newYork = fuzzySearch('yo', sourceData, ['label'])
    expect(newYork).toEqual([
      {
        value: 'New York',
        label: 'New_York',
      },
    ])
  })
})
