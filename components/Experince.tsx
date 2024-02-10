"use client"

import { Experince } from '@prisma/client'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { IoLocation } from 'react-icons/io5'
import {format} from "date-fns"
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Experince({ex, is}: {ex: Experince, is: boolean}) {
  const router = useRouter();
  const deleteD = () => {
      setIsLoading(true);
      axios.delete(`/api/exp/${ex.id}`).then((data) => {
        toast.success("experince deleted");
        router.refresh();
      }).catch((err) => {
          toast.error(err.response.data)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Card className='mx-2'>
        <CardContent className='flex flex-col justify-start items-center gap-2 md:w-[20vw] w-[80vw] my-2 p-2'>
             <div className='flex flex-col gap-3 justify-start items-center'>
                <span className='text-sm text-neutral-200 dark:text-neutral-400'>{ex.company}</span>
                <span className='text-sm text-neutral-200 dark:text-neutral-400'>{ex.posotion}</span>
             </div>

             <span className='flex flex-row gap-2 items-center justify-center'><IoLocation size={18} /> {ex.location}</span>
             <span>Started On: {format(ex.startingDate, "MM-dd-yyyy")}</span>
             <span>lastedTill: {ex.endingDate ? format(ex.endingDate, "MM-dd-yy") : "present"}</span>
             {is && (<Button disabled={isLoading} className='' onClick={() => deleteD()}>Delete</Button>)}
        </CardContent>
    </Card>
  )
}
