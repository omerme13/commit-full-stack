import { useEffect, useState } from 'react'
import { fetchFruits } from '../api/fruits.ts'
import type { Fruit } from '../types.ts'

export type FruitsState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; fruits: Fruit[] }

export function useFruits(): FruitsState {
  const [state, setState] = useState<FruitsState>({ status: 'loading' })

  useEffect(() => {
    // Aborting on cleanup cancels the first request under StrictMode's double-invoke and on unmount.
    const controller = new AbortController()

    fetchFruits(controller.signal)
      .then((fruits) => setState({ status: 'success', fruits }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          error: err instanceof Error ? err.message : 'Something went wrong',
        })
      })

    return () => controller.abort()
  }, [])

  return state
}
