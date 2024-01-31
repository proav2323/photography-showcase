"use client"

import { useModal } from '@/hooks/useModel'
import React from 'react'
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

export default function ProjectDetails() {
    const {onOpen, onClose, isOpen, type, data} = useModal()
    const open = type === "updateProject" && isOpen;
    const {currentUser, project} = data;

    

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
                    <div></div>
                    <div></div>
                </div>
</DialogContent>
    </Dialog>
  )
}
