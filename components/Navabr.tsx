import React from 'react'
import {user} from "@prisma/client"

export default function Navabr({currentUser}: {currentUser: null | user}) {
  return (
   <div className='flex flex-row justify-between items-center h-[60px] w-full dark:bg-neutral-700 bg-neutral-400 shadow-md'>
      <div className='flex flex-row gap-2'>
          <span className='text-lg font-bold'>PHOTOSHOW</span>
      </div>
   </div>
  )
}
