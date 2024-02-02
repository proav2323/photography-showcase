"use client"

import { useModal } from '@/hooks/useModel'
import React, { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog';
import Heading from '../Heading';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CommentCard from '../CommentCard';

export default function ProjectDetails() {
    const {onOpen, onClose, isOpen, type, data} = useModal()
    const open = type === "updateProject" && isOpen;
    const {currentUser, project} = data;
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const router = useRouter()

    const comment = async() => {
      if (message === "") {
          return;
      }
        setLoading(true)
        await axios.post(`/api/project/${project?.id}`, {message: message}).then((data) => {
          toast.success("comment added")
          onClose()
          router.refresh()
          console.log(data.data)
          setMessage("")
          onOpen("updateProject", {project: data.data, currentUser: currentUser})
        }).catch((err) => {
          toast.error(err.response.data)
        }).finally(() => {
          setLoading(false)
        })
    }

    

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
          <DialogContent className='md:w-[98vw] w-[100vw] max-w-[100vw] max-h-[100vh] h-fit overflow-y-scroll noScroll overflow-x-hidden'>
               <div className='flex flex-col gap-4 justify-start items-center'>
                 <div className='flex flex-col gap-1 w-[95%] text-left'>
                    <Heading title={project === undefined ? "" : project.name} subtitle={project === undefined ? "" : project.description} />
                    <span className='text-xs font-light dark:text-neutral-400 text-neutral-200'>{project?.moreToKnow}</span>
                 </div>

                <Carousel
      opts={{
        align: "start",
      }}
      className="w-[90vw] h-fit"
    >
      <CarouselContent>
        {project?.images.map((url, index) => (
          <CarouselItem key={index} className="w-[95vw] h-[95vh]">
             <div className='w-full h-full relative'>
                <Image src={url} alt="" fill />
             </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
              </div>

            <div className='flex flex-row gap-2 items-center justify-start cursor-pointer w-[95%]'>
                         <Avatar className='w-[50px] h-[50px] text-sm'>
  <AvatarImage src={project?.user.profileImg ?? ""} />
  <AvatarFallback>{project?.user.firstName.charAt(0)}{project?.user.lastName.charAt(0)}</AvatarFallback>
</Avatar>
<span className='font-bold text-2xl'>{project?.user.firstName} {project?.user.lastName}</span>
                </div>

                <div className='flex flex-col gap-2 justify-start items-start'>
                    {currentUser !== null && currentUser !== undefined && (
                    <div className='flex flex-row justify-center items-center gap-2 w-full'>
                      <div className='md:flex flex-col gap-1 justify-start items-center ml-2 hidden'>
                                                     <Avatar className='w-[30px] h-[30px] text-sm'>
  <AvatarImage src={currentUser.profileImg ?? ""} />
  <AvatarFallback>{currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}</AvatarFallback>
</Avatar>
<span>{currentUser.firstName} {currentUser.lastName}</span>
                      </div>
                      <input value={message} onChange={(e) => setMessage(e.target.value)} className='flex-1 w-full rounded-md py-2 px-4' placeholder={`comment as ${currentUser.firstName} ${currentUser.lastName}`} />
                      <Button onClick={() => comment()} disabled={loading} className='flex flex-row justify-center items-center gap-2'><Send size={16} /> Send</Button>
                    </div>
)}
                    <div className='flex flex-col gap-2 w-full'>
                      {project?.comments.map((comment) => (
                        <CommentCard currentUser={currentUser} key={comment.id} comment={comment} />
                      ))}
                    </div>
                </div>
</DialogContent>
    </Dialog>
  )
}
