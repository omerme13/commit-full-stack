import { useState } from 'react'
import './App.css'
import { FruitList } from './components/FruitList.tsx'
import { SearchInput } from './components/SearchInput.tsx'
import { useFruits } from './hooks/useFruits.ts'

function App() {
  const { fruits, loading, error } = useFruits()
  const [query, setQuery] = useState('')
  console.log('....')
  const visibleFruits = fruits.filter((fruit) =>
    fruit.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <main className="app">
      <h1>Fruits</h1>
      <SearchInput value={query} onChange={setQuery} />

      {loading && <p role="status">Loading...</p>}
      {error && <p role="alert" className="error">Failed to load fruits: {error}</p>}
      {!loading && !error && visibleFruits.length === 0 && <p>No fruits found.</p>}
      {!loading && !error && <FruitList fruits={visibleFruits} />}
    </main>
  )
}

export default App
