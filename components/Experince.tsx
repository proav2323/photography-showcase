"use client"

import { Experince } from '@prisma/client'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { IoLocation } from 'react-icons/io5'
import {format} from "date-fns"

export default function Experince({ex}: {ex: Experince}) {
  return (
    <Card className='mx-2'>
        <CardContent className='flex flex-col justify-start items-start gap-2 w-[20vw]'>
             <div className='flex flex-col gap-1 justify-start items-center'>
                <span className='text-sm text-neutral-200 dark:text-neutral-600'>{ex.company}</span>
                <span className='text-sm text-neutral-200 dark:text-neutral-600'>{ex.posotion}</span>
             </div>

             <span className='flex flex-row gap-2 items-center justify-center'><IoLocation size={18} /> {ex.location}</span>
             <span>Started On: {format(ex.startingDate, "MM-dd-yyyy")} lastedTill: {ex.endingDate ? format(ex.endingDate, "MM-dd-yy") : "present"}</span>
        </CardContent>
    </Card>
  )
}
