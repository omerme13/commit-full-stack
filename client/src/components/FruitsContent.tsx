import { memo } from 'react'
import type { Fruit } from '../types.ts'
import { FruitList } from './FruitList.tsx'

interface FruitsContentProps {
  fruits: Fruit[]
  error: string | null
  isLoading: boolean
}

// Memoized so keystrokes (which only change the raw query in the parent) skip this subtree.
export const FruitsContent = memo(function FruitsContent({
  fruits,
  error,
  isLoading,
}: FruitsContentProps) {
  if (error) {
    return (
      <p role="alert" className="error">
        Failed to load fruits: {error}
      </p>
    )
  }

  if (isLoading && fruits.length === 0) {
    return <p role="status">Loading fruits...</p>
  }

  return (
    <>
      {isLoading && <p role="status">Loading fruits...</p>}
      <FruitList fruits={fruits} />
    </>
  )
})
