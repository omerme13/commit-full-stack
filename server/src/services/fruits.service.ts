import { fruits } from '../data/fruits.js'
import type { Fruit } from '../types.js'

export function findFruits(query: string): readonly Fruit[] {
  const q = query.trim().toLowerCase()
  if (!q) return fruits
  return fruits.filter((fruit) => fruit.name.toLowerCase().includes(q))
}
