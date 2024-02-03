"use client"

import { links } from '@prisma/client'
import React from 'react'

export default function Link({link}: {link: links}) {
  return (
    <a href={link.link} className='rounded-full mx-2 p-3 bg-slate-200 dark:bg-slate-700 dark:text-white text-black'>{link.name}</a>
  )
}
