import React from 'react'
import { WordSearchResults } from 'common/types/types'


export type SearchResultViewProps = {
  searchResults: WordSearchResults[]
}
const SearchResultView = ({searchResults}: SearchResultViewProps): JSX.Element => {
  return (
    <div>
      {searchResults?.map((w) => {
        return <div key={w.id}>{w.labels[0].label}</div>
      })}
    </div>
  )
}

export default SearchResultView