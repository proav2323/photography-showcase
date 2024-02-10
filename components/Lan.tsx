"use client"

import { language } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Lan({lan, is}: {lan: language, is: boolean}) {
  const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
  const deletL = () => {
      if (isLoading || !is) {
    return;
  }
      setIsLoading(true);
      axios.delete(`/api/lan/${lan.id}`).then((data) => {
        toast.success("langauge deleted");
        router.refresh();
      }).catch((err) => {
          toast.error(err.response.data)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <div className='flex flex-row justify-between gap-2 items-center p-2 md:w-[15vw] w-[80vw] rounded-full my-2 mx-2 bg-white dark:text-neutral-600 cursor-pointer' onClick={() => deletL()}>
        <span className='text-md font-semibold'>{lan.name}</span>
        <span className='text-sm text-slate-300 dark:text-slate-800'>{lan.level}</span>
    </div>
  )
}
