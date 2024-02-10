"use client"

import { links } from '@prisma/client'
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Link({link, is}: {link: links, is: boolean}) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
  const deletL = () => {
      if (isLoading) {
    return;
  }
      setIsLoading(true);
      axios.delete(`/api/link/${link.id}`).then((data) => {
        toast.success("link deleted");
        router.refresh();
      }).catch((err) => {
          toast.error(err.response.data)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <div className='flex flex-row justify-between items-center md:w-[8vw] w-[38vw] rounded-full mx-2 p-3 bg-slate-200 dark:bg-slate-700 dark:text-white text-black'>
          <a href={link.link} className='text-xs flex-1 w-full text-center'>{link.name}</a>
          {is && (<Trash size={12} onClick={() => deletL()} className='cursor-pointer' />)}
    </div>
  )
}
