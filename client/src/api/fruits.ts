import type { Fruit } from '../types.ts'

export async function fetchFruits(query: string, signal?: AbortSignal): Promise<Fruit[]> {
  const params = new URLSearchParams({ q: query })
  const res = await fetch(`/api/fruits?${params}`, { signal })
  if (!res.ok) {
    const body: { message?: string } | null = await res.json().catch(() => null)
    throw new Error(body?.message ?? `Request failed (${res.status})`)
  }
  return res.json()
}
