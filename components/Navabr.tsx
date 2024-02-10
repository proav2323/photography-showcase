"use client"
import React, { useState } from 'react'
import {user} from "@prisma/client"
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import { LogIn, Search, Share } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useModal } from '@/hooks/useModel'
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'
import { userWithInfo } from '@/types'


export default function Navabr({currentUser}: {currentUser: null | userWithInfo}) {
  const {onOpen, onClose} = useModal()
  const [search, setSearch] = useState("")
  const path = usePathname()

  const model = () => {
    if (!currentUser) {
      onClose()
      onOpen("Login")
      return;
    }

    onOpen("addProject", {currentUser: currentUser})
  }

  const router = useRouter()

  const searchG = () => {
      router.push(`/search?search=${search}`)
      console.log(path)
  }
  return (
   <div className='flex flex-row justify-between items-center h-[60px] w-full dark:bg-neutral-700 bg-neutral-400 shadow-md gap-2 dark:shadow-black shadow-neutral-400 sticky top-0 z-[50]'>
      <div className='flex flex-row gap-2 px-2 cursor-pointer' onClick={() => router.push("/")}>
          <span className='md:text-lg font-bold text-md'>PHOTOSHOW</span>
      </div>
      {path && path !== "/search" && (
      <div className='md:w-[50%] mx-2 hidden md:flex relative bg-white dark:bg-neutral-700 rounded-full justify-center items-center'>
        <Button className='dark:text-white text-black bg-transparent rounded-l-full border-[1px] dark:border-black border-neutral-400 h-[50px] rounded-r-none hover:bg-transparent'><Search size={16} className='text-center' /></Button>
        <input onKeyUp={(e) => e.key === "Enter" ? searchG() : () => {}} className='bg-transparent h-[50px] focus:outline-none rounded-r-full md:w-[100%] px-2 w-full border-[1px] dark:border-black border-neutral-400 transition' type='search' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      )}
      <div className='flex flex-row justify-center items-center gap-2 px-2'>
        <ModeToggle />
        <Button onClick={() => router.push("/search")} variant={"outline"} className='flex flex-row gap-2 justify-center md:hidden items-center'><Search size={24} /></Button>
        <Button variant={"outline"} className='flex-row gap-2 justify-center items-center hidden md:flex' onClick={() => model()}><Share size={24} /> share your work</Button>
        {currentUser ? (
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Avatar className=' cursor-pointer'>
  <AvatarImage src={currentUser.profileImg ?? ""} />
  <AvatarFallback>{currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Discover</DropdownMenuItem>
    <DropdownMenuItem>Hire</DropdownMenuItem>
    <DropdownMenuItem className='flex md:hidden' onClick={() => model()}>Show Your Work</DropdownMenuItem>
    <DropdownMenuSeparator></DropdownMenuSeparator>
    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        ) : (
          <Button variant={"secondary"} onClick={() => onOpen("Login")} className='flex flex-fow gap-2 justify-center items-center'><LogIn size={16} /> Login</Button>
        )}
      </div>
   </div>
  )
}
