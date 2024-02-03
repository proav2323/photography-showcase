"use client"

import { userWithInfo } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import bg from '../public/images/bg.jpg'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { IoLocationSharp } from "react-icons/io5";
import { Button } from './ui/button'
import { user } from '@prisma/client'
import Link from './Link'
import Experince from './Experince'
import Lan from './Lan'
import ProjectsList from './ProjectsList'


export default function UserProfile({user, currentUser}: {user: userWithInfo, currentUser: user | null}) { 
  const bioo = user.bio ?? "";
  const [bio, setBio] = useState(bioo ? bioo.length > 30 ? bioo.substring(0, 30) + "..." : bioo : "")
  const [showMore, setShowMore] = useState(bio.length < 30)

  const chnage = () => {
     if (showMore) {
      setShowMore(false)
      setBio(prev => prev.length > 30 ? prev.substring(0, 30) + "..." : prev);
     } else {
      setShowMore(true)
      setBio(bioo);
     }
  }
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <div className='w-full h-[205px] relative'>
         <Image fill src={user.bannerImg !== null ? user.bannerImg : bg} alt="" />
      </div>
    <div className='flex md:flex-row flex-col justify-center items-center gap-4 w-full relative'>
      <Card className='absolute -top-[50px] mx-auto md:left-[0.26vw] md:w-[25vw] w-[90%]'>
        <CardContent className='flex justify-center items-center flex-col p-2 w-full overflow-x-hidden'>
            <Avatar className='my-2 w-[100px] h-[100px]'>
              <AvatarImage src={user.profileImg ?? ""} />
              <AvatarFallback>{user.firstName.charAt(0)} {user.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className='text-xl font-bold'>{user.firstName} {user.lastName}</span>
            {user.occupation && (<span className='my-2 font-semibold text-lg text-neutral-300 dark:text-neutral-500'>{user.occupation}</span>)}
            {bio !== "" && (<p onClick={() => chnage()} className='text-center my-2 break-words text-sm font-light cursor-pointer text-neutral-200 dark:text-neutral-500 w-[98%]'>{bio}</p>)}
            {user.location && (<span><IoLocationSharp size={18} /> {user.location}</span>)}
            {user.websiteUrl && (<a href={user.websiteUrl} className='my-2 text-blue-500 hover:underline transition'>{user.websiteUrl.length > 30 ? user.websiteUrl.substring(0, 30) + "..." : user.websiteUrl }</a>)}
            {currentUser && user.id === currentUser.id && (<Button className='my-2 w-[98%]'>Edit Profile</Button>)}
            {currentUser && user.id !== currentUser.id && (<Button className='my-2 w-[98%]'>Hire</Button>)}
            {user.contactInfo && (<span className='text-sm text-neutral-100 dark:text-neutral-500'>{user.contactInfo}</span>)}

            {user.socialLinks.length > 0 && (
            <div className='flex flex-col justify-start items-start gap-2'>
              <span className='text-lg font-bold'>Find me</span>

              <div className='flex flec-row max-w-[98%] overflow-x-scroll noScroll'>
                {user.socialLinks.map((link) => (
                  <Link link={link} key={link.id} />
                ))}
              </div>
            </div>
            )}

            {user.workExperince.length > 0 && (
            <div className='flex flex-col justify-start items-start gap-2'>
              <span className='text-lg font-bold'>my Experince</span>

              <div className='flex flec-row max-w-[98%] overflow-x-scroll noScroll'>
                {user.workExperince.map((ex) => (
                  <Experince key={ex.id} ex={ex} />
                ))}
              </div>
            </div>
            )}

            {user.languages.length > 0 && (
            <div className='flex flex-col justify-start items-start gap-2'>
              <span className='text-lg font-bold'>languages i know</span>

              <div className='flex flec-row max-w-[98%] overflow-x-scroll noScroll'>
                {user.languages.map((ex) => (
                  <Lan key={ex.id} lan={ex} />
                ))}
              </div>
            </div>
            )}
        </CardContent>
      </Card>
      <div className='md:w-[84vw] md:ml-[26vw] w-[95%] my-2 md:my-0'>
        <ProjectsList projects={user.projects} showMoreOptions currentUser={currentUser} />
      </div>
    </div>
    </div>
  )
}
