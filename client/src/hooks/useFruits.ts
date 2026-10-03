import { useEffect, useState } from 'react'
import { fetchFruits } from '../api/fruits.ts'
import type { Fruit } from '../types.ts'

// Each result remembers the query it answers, so "loading" is derived instead of set in the effect.
type Result =
  | { query: string; status: 'success'; fruits: Fruit[] }
  | { query: string; status: 'error'; error: string }

// Stable reference: an inline `[]` would be a new array every render and defeat memo downstream.
const EMPTY_FRUITS: Fruit[] = []

export interface FruitsState {
  fruits: Fruit[]
  error: string | null
  isLoading: boolean
}

export function useFruits(query: string): FruitsState {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    // Aborting on cleanup cancels stale requests (query changed, StrictMode double-invoke, unmount),
    // so an older response can never overwrite a newer one.
    const controller = new AbortController()

    fetchFruits(query, controller.signal)
      .then((fruits) => setResult({ query, status: 'success', fruits }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setResult({
          query,
          status: 'error',
          error: err instanceof Error ? err.message : 'Something went wrong',
        })
      })

    return () => controller.abort()
  }, [query])

  const isLoading = result?.query !== query

  return {
    // Keep showing the previous list while the next query loads, instead of flashing empty.
    fruits: result?.status === 'success' ? result.fruits : EMPTY_FRUITS,
    error: !isLoading && result?.status === 'error' ? result.error : null,
    isLoading,
  }
}
