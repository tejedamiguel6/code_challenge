'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchAccount({
  placeholder,
}: {
  placeholder: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { replace } = useRouter()

  // handling search on the server
  const handleSearch = useDebouncedCallback((term: number) => {
    const params = new URLSearchParams(searchParams)
    console.log('TERM->', params)
    if (term) {
      params.set('query', term.toString())
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  return (
    <div>
      <label htmlFor='search'>Search Account</label>
      <input
        type='number'
        onChange={(e) => handleSearch(parseInt(e.target.value, 10) || 0)}
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}
