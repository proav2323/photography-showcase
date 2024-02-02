"use client"

import { CommentsWithUser } from '@/types'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Delete, Pen, Trash } from 'lucide-react'
import getCurrentUser from '@/actions/getCurrentUser'
import { user } from '@prisma/client'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useModal } from '@/hooks/useModel'
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export default function CommentCard({comment, currentUser}: {comment: CommentsWithUser, currentUser?: user | null}) {
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState("")
   const {onOpen, onClose} = useModal()
   const router = useRouter()

   const deleteComment = () => {
    setLoading(true)
    axios.delete(`/api/project/${comment.projectId}/${comment.id}`).then((data) => {
        toast.success("comment deleted")
        onClose()
          router.refresh()
          onOpen("updateProject", {project: data.data, currentUser: currentUser === null ? undefined : currentUser})  
    }).catch((err) => {
          toast.error(err.response.data)
        }).finally(() => {
          setLoading(false)
        })
   }

   const upcomment = () => {
    if (message === "") {
      return;
    }
      setLoading(true)
      axios.put(`/api/project/${comment.projectId}/${comment.id}`, {message: message}).then((data) => {
        toast.success("comment edited")
        onClose()
          router.refresh()
          setMessage("")
          onOpen("updateProject", {project: data.data, currentUser: currentUser === null ? undefined : currentUser})  
    }).catch((err) => {
          toast.error(err.response.data)
        }).finally(() => {
          setLoading(false)
        })
   }
  return (
<Card>
  <CardContent className='flex md:flex-row flex-col justify-start items-center gap-2 p-1 md:p-3 w-full'>
                           <div className='flex flex-col gap-1 justify-start items-center ml-2'>
                                                     <Avatar className='w-[30px] h-[30px] text-sm'>
  <AvatarImage src={comment.createdBy.profileImg ?? ""} />
  <AvatarFallback>{comment.createdBy.firstName.charAt(0)}{comment.createdBy.lastName.charAt(0)}</AvatarFallback>
</Avatar>
<span>{comment.createdBy.firstName} {comment.createdBy.lastName}</span>
                      </div>
                      <div className='flex-1 flex flex-row w-full items-center justify-center'>
                                                <span className='flex-1 w-full text-lg font-bold dark:text-neutral-600 text-neutral-300 ml-2'>{comment.message}</span>
                      {currentUser && currentUser.id === comment.createdBy.id && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className='m-2' variant={"link"}><Pen size={16} /></Button>
                        </PopoverTrigger>
                        <PopoverContent className='flex flex-row justify-center items-center sm:w-[300px] md:w-[500px] h-[100px] gap-2'>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} className='flex-1 w-full rounded-md py-2 px-4' placeholder={`comment as ${currentUser.firstName} ${currentUser.lastName}`} />
                      <Button onClick={() => upcomment()} disabled={loading} className='2'>update</Button>
                        </PopoverContent>
                      </Popover> )}
                      {currentUser && currentUser.id === comment.createdBy.id && (<Button disabled={loading} onClick={() => deleteComment()} className='m-2' variant={"link"}><Trash size={16} /></Button>)}
                      </div>
  </CardContent>
</Card>
  )
}
