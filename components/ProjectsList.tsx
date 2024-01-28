"use client"

import { projectWithCommenst } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import bg from '../public/images/bg.jpg'
import { LocateIcon } from 'lucide-react'

export default function ProjectsList({projects}: {projects: projectWithCommenst[]}) {
    const [show, setShow] = useState(false)
    const [projectId, setProjectId] = useState("")
    const [popshow, popsetShow] = useState(false)
    const [popprojectId, popsetProjectId] = useState("")
  return (
    <div className='flex flex-wrap gap-2'>
       {projects.map((project, index) => {
        const name = project.name.length> 15 ? project.name.substring(0, 15) + "..." : project.name; 
        return (
            <div key={project.id} className='flex flex-col gap-2 px-2'>
                <div className='relative w-60 h-60 rounded-md cursor-pointer transition-all duration-300 ease-in-out' onMouseEnter={() => {
                    setShow(true)
                    setProjectId(project.id)
                }} onMouseLeave={() => {
                    setShow(false)
                    setProjectId("")
                }}>
                    <Image src={project.images[0]} alt="project" fill className='rounded-md'  />
                    {show && projectId === project.id && (
                        <div className='absolute bottom-2 left-2 bg-gradient-to-t'>
                            <span className='hover:underline transition'>{name}</span>
                        </div>
                    )}
                </div>
                    <Popover open={popshow && popprojectId === project.id}>
                        <PopoverTrigger>
                                            <div className='flex flex-row gap-2 items-center justify-start cursor-pointer' onMouseEnter={() => {
                    popsetShow(true)
                    popsetProjectId(project.id)
                }} onMouseLeave={() => {
                    popsetShow(false)
                    popsetProjectId("")
                }}>
                         <Avatar className='w-5 h-5 text-sm'>
  <AvatarImage src={project.user.profileImg ?? ""} />
  <AvatarFallback>{project.user.firstName.charAt(0)}{project.user.lastName.charAt(0)}</AvatarFallback>
</Avatar>
<span className='font-bold text-sm'>{project.user.firstName} {project.user.lastName}</span>
                </div>
                        </PopoverTrigger>
                        <PopoverContent className='py-1 px-1 flex flex-col justify-start items-center gap-2 relative'>
                           <div className='w-60 h-20 relative'>
                             <Image src={project.user.bannerImg ? project.user.bannerImg : bg} alt="" fill className='rounded-md' />
                           </div>
                                                        <Avatar className='w-10 h-10 text-sm absolute top-[60px] left-auto right-auto'>
  <AvatarImage src={project.user.profileImg ?? ""} />
  <AvatarFallback>{project.user.firstName.charAt(0)}{project.user.lastName.charAt(0)}</AvatarFallback>
</Avatar>
<div className='flex flex-col gap'>
<span className='text-lg font-bold mt-3'>{project.user.firstName} {project.user.lastName}</span>
{project.user.location && (<span><LocateIcon size={14} /> {project.user.location }</span>)}
</div>
                        </PopoverContent>
                    </Popover>
            </div>
        )
       })}
    </div>
  )
}
