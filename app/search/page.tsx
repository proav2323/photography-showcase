import { getSaerchedJobs } from '@/actions/getSearchJobs'
import ProjectsList from '@/components/ProjectsList'
import React, { useEffect } from 'react'

export default async function page({searchParams}: {searchParams: {search: string}}) {
    const getJobs = await getSaerchedJobs(searchParams)
  return (
    <div className='flex flex-col w-full gap-2'>
        <ProjectsList projects={getJobs} showButton />
    </div>
  )
}
