import type { Fruit } from '../types.ts'

interface FruitListProps {
  fruits: Fruit[]
}

export function FruitList({ fruits }: FruitListProps) {
  return (
    <ul className="fruit-list">
      {fruits.map((fruit) => (
        <li key={fruit.id} className="fruit-card">
          {fruit.name}
        </li>
      ))}
    </ul>
  )
}
