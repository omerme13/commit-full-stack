interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search fruits..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
