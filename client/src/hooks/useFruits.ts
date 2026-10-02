import { useEffect, useState } from 'react'
import { fetchFruits } from '../api/fruits.ts'
import type { Fruit } from '../types.ts'

export function useFruits() {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    fetchFruits()
      .then((data) => {
        if (!ignore) setFruits(data)
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return { fruits, loading, error }
}
