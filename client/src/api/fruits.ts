import type { Fruit } from '../types.ts'

export async function fetchFruits(signal?: AbortSignal): Promise<Fruit[]> {
  const res = await fetch('/api/fruits', { signal })
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`)
  }
  return res.json()
}
