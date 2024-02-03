"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchInput({saerchh}: {saerchh: string}) {
    const [search, setSearch] = useState(saerchh)

    const router = useRouter()

    const saerchG = () => {
        router.push(`/search?search=${search}`)
    }
  return (
    <div className="flex flex-row gap-2 w-[98%] justify-center items-center">
            <input className='flex-1 w-full p-3 rounded-md bg-neutral-300' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={(e) => e.key === "Enter" ? saerchG() : () => {}} />
            <Button onClick={() => saerchG()}><Search size={14} /></Button>
       </div>
  )
}
