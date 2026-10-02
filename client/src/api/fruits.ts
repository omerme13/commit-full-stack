import type { Fruit } from '../types.ts'

// Share one in-flight request so StrictMode's double-invoked effect doesn't fire two.
let inFlight: Promise<Fruit[]> | null = null

async function request(): Promise<Fruit[]> {
  const res = await fetch('/api/fruits')
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`)
  }
  return res.json()
}

export function fetchFruits(): Promise<Fruit[]> {
  inFlight ??= request().finally(() => {
    inFlight = null
  })
  return inFlight
}
