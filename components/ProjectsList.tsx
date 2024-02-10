"use client"

import { projectWithCommenst, userWithInfo } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import bg from '../public/images/bg.jpg'
import { LocateIcon, MenuIcon } from 'lucide-react'
import { useModal } from '@/hooks/useModel'
import { user } from '@prisma/client'
import EmptyState from './EmptyState'
import { useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ProjectsList({projects, currentUser, showButton = false, showMoreOptions = false, title, subTitle}: {projects: projectWithCommenst[], currentUser?: userWithInfo | null, showButton?: boolean, showMoreOptions?: boolean, title?: string, subTitle?: string}) {
    const [show, setShow] = useState(false)
    const [projectId, setProjectId] = useState("")
    const [popshow, popsetShow] = useState(false)
    const [popprojectId, popsetProjectId] = useState("")
    const {onOpen, onClose} = useModal();
    const router = useRouter()

    if (projects.length <= 0) {
        return (
            <EmptyState title={title ? title : 'No Projects found'} showReset={showButton} subTitle={subTitle ? subTitle :'try removing search'} url="/search" />
        )
    }

    const deleteProj = (projectId: string) => {
       axios.delete(`/api/project/${projectId}`).then(() => {
        toast.success("project deleted")
        router.refresh()
       }).catch((err) => {
        toast.error(err.response.data)
       })
    }

    const edit = (proj: projectWithCommenst) => {
        onClose();
        onOpen("addProject", {isEditingProject: true, project: proj})
    }
  return (
    <div className='flex flex-wrap gap-2'>
       {projects.map((project, index) => {
        const name = project.name.length> 15 ? project.name.substring(0, 15) + "..." : project.name; 
        return (
            <div key={project.id} className='flex flex-col gap-2 px-2 relative'>

                <div className='relative w-60 h-60 rounded-md cursor-pointer transition-all duration-300 ease-in-out' onMouseEnter={() => {
                    setShow(true)
                    setProjectId(project.id)
                }} onMouseLeave={() => {
                    setShow(false)
                    setProjectId("")
                }} onClick={() => onOpen("updateProject", {currentUser: currentUser !== null ? currentUser : undefined, project: project})}>
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
                }} onClick={() => router.push(`/users/${project.user.id}`)}>
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
                                    {showMoreOptions && (
                <DropdownMenu>
                    <DropdownMenuTrigger className='absolute top-4 right-4 text-red-500'>
                          <MenuIcon size={22} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => edit(project)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => deleteProj(project.id)}>delete</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                )}
            </div>
        )
       })}
    </div>
  )
}
