"use client"

import { language } from '@prisma/client'
import React from 'react'

export default function Lan({lan}: {lan: language}) {
  return (
    <div className='flex flex-row justify-center items-center md:w-[20vw] w-[80vw] rounded-full my-2 mx-2 bg-white dark:text-neutral-600'>
        <span className='text-md font-semibold'>{lan.name}</span>
        <span className='text-sm text-slate-300 dark:text-slate-800'>{lan.level}</span>
    </div>
  )
}
