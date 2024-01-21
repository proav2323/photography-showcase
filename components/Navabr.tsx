import React from 'react'
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


export default function Navabr({currentUser}: {currentUser: null | user}) {
  return (
   <div className='flex flex-row justify-between items-center h-[60px] w-full dark:bg-neutral-700 bg-neutral-400 shadow-md gap-2 dark:shadow-black shadow-neutral-400'>
      <div className='flex flex-row gap-2 px-2'>
          <span className='text-lg font-bold'>PHOTOSHOW</span>
      </div>
      <div className='md:w-[50%] mx-2 hidden md:flex relative bg-white dark:bg-neutral-700 rounded-full justify-center items-center'>
        <Button className='dark:text-white text-black bg-transparent rounded-l-full border-[1px] dark:border-black border-neutral-400 h-[50px] rounded-r-none hover:bg-transparent'><Search size={16} className='text-center' /></Button>
        <input className='bg-transparent h-[50px] focus:outline-none rounded-r-full md:w-[100%] px-2 w-full border-[1px] dark:border-black border-neutral-400 transition' type='search' placeholder='Search' />
      </div>
      <div className='flex flex-row justify-center items-center gap-2 px-2'>
        <ModeToggle />
        <Button variant={"outline"} className='flex flex-row gap-2 justify-center md:hidden items-center'><Search size={24} /></Button>
        <Button variant={"outline"} className='flex flex-row gap-2 justify-center items-center'><Share size={24} /> share your work</Button>
        {currentUser ? (
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Avatar>
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
    <DropdownMenuItem></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        ) : (
          <Button variant={"secondary"} className='flex flex-fow gap-2 justify-center items-center'><LogIn size={16} /> Login</Button>
        )}
      </div>
   </div>
  )
}
