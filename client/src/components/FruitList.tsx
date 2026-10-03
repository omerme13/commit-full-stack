import { memo } from 'react'
import type { Fruit } from '../types.ts'

interface FruitListProps {
  fruits: Fruit[]
}

// Memoized so toggling the loading line in the parent doesn't re-render the list.
export const FruitList = memo(function FruitList({ fruits }: FruitListProps) {
  if (fruits.length === 0) {
    return <p>No fruits found.</p>
  }

  return (
    <ul className="fruit-list">
      {fruits.map((fruit) => (
        <li key={fruit.id} className="fruit-card">
          {fruit.name}
        </li>
      ))}
    </ul>
  )
})
