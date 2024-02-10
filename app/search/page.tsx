import getCurrentUser from '@/actions/getCurrentUser'
import { getSaerchedJobs } from '@/actions/getSearchJobs'
import Heading from '@/components/Heading'
import ProjectsList from '@/components/ProjectsList'
import SearchInput from '@/components/SearchInput'
import { Button } from '@/components/ui/button'
import { userWithInfo } from '@/types'
import { Search } from 'lucide-react'
import React, { useEffect } from 'react'

export default async function page({searchParams}: {searchParams: {search: string}}) {
    const getJobs = await getSaerchedJobs(searchParams)
    const currentUser: userWithInfo | null = await getCurrentUser();
  return (
    <div className='flex flex-col w-full gap-4 my-2 justify-start items-center'>
        <SearchInput saerchh={searchParams.search} />
        <Heading title={`you searched for ${searchParams.search}`} subtitle='projects we found with your search' />
        <ProjectsList projects={getJobs} showButton currentUser={currentUser} />
    </div>
  )
}
