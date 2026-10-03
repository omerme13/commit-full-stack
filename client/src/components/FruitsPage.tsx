import { useState } from 'react'
import { useDebouncedValue } from '../hooks/useDebouncedValue.ts'
import { useFruits } from '../hooks/useFruits.ts'
import { FruitsContent } from './FruitsContent.tsx'
import { SearchInput } from './SearchInput.tsx'

const SEARCH_DEBOUNCE_MS = 300

export function FruitsPage() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS)
  const { fruits, error, isLoading } = useFruits(debouncedQuery.trim())
  console.log('rendering...', { fruits, error, isLoading });

  // Siblings: the input keeps its place in the tree whatever state the content is in.
  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <FruitsContent fruits={fruits} error={error} isLoading={isLoading} />
    </>
  )
}
