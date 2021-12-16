import FuzzySearch from 'fuzzy-search'
export const fuzzySearch = <T extends Record<string, unknown> | string>(
  searchText: string,
  sourceData: T[],
  searchKeys: string[],
  options?: FuzzySearch.Options,
) => {
  const searcher = new FuzzySearch(sourceData, searchKeys, { ...options })
  return searcher.search(searchText)
}
