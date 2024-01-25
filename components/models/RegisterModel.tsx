"use client"

import { useModal } from '@/hooks/useModel'
import React, {useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Heading from '../Heading'
import * as z from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from '../ui/separator'
import {signIn} from 'next-auth/react'
import Toast from "react-hot-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import axios from "axios"
import { useRouter } from 'next/navigation'

export const loginSchema = z.object({
    email: z.string().email({
        message: "email is invalid"
    }).min(1, {
        message: "email is required"
    }),
    password: z.string().min(1, {
        message: "password is required"
    }),
    firstName: z.string().min(1, {
        message: "first name is required"
    }),
    lastName: z.string().min(1, {
        message: "last name is required"
    }),
})

export default function RegisterModel() {
    const {isOpen, onOpen, onClose, type} = useModal()
    const open = type === "register" && isOpen

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        }
    })

const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = (values: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        axios.post("/api/register", values).then(() => {
            Toast.success("registe successfull");
            router.refresh()
            openReg()
        }).catch((err) => {
            Toast.error(err.response.data)
        }).finally(() => {
            setIsLoading(false)
        })
  }

  const openReg = () => {
    onClose()
    onOpen("Login")
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
        <DialogContent className='h-fit max-h-[100vh] overflow-y-scroll noScroll'>
            <div className='mb-4'>
            <Heading title='Welcome!!' subtitle='create account' />
            </div>
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">
                <div className='flex flex-row justify-between items-center gap-2'>
        <FormField
        disabled={isLoading}
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="jack" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        disabled={isLoading}
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
        disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jack@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <Button disabled={isLoading} type="submit">register</Button>
        <div className='flex flex-col gap-2'>
                    <Separator />
        <span className='text-blue-300 cursor-pointer text-sm hover:opacity-70 transition' onClick={() => openReg()}>already here? login</span>
            </div>
      </form>
    </Form>
        </DialogContent>
    </Dialog>
  )
}
