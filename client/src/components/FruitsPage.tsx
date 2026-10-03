import { useMemo, useState } from 'react'
import { useFruits } from '../hooks/useFruits.ts'
import { FruitList } from './FruitList.tsx'
import { SearchInput } from './SearchInput.tsx'

export function FruitsPage() {
  
  const state = useFruits()
  console.log('rendering...', state);
  const [query, setQuery] = useState('')

  // Derived from fetched data + query; never stored in state.
  const filteredFruits = useMemo(() => {
    if (state.status !== 'success') return []
    const q = query.trim().toLowerCase()
    if (!q) return state.fruits
    return state.fruits.filter((fruit) => fruit.name.toLowerCase().includes(q))
  }, [state, query])

  if (state.status === 'loading') {
    return <p role="status">Loading fruits...</p>
  }

  if (state.status === 'error') {
    return (
      <p role="alert" className="error">
        Failed to load fruits: {state.error}
      </p>
    )
  }

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <FruitList fruits={filteredFruits} />
    </>
  )
}
