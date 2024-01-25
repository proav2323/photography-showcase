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
    })
})

export default function LoginModel() {
    const {isOpen, onOpen, onClose, type} = useModal()
    const open = type === "Login" && isOpen

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = (values: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        signIn("credentials", {
            ...values,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);
           if (callback?.ok) {
             Toast.success("logged in")
             onClose()
             router.refresh();
           }

           if (callback?.error) {
           Toast.error(callback.error)
           }
        })
  }

  const openReg = () => {
    onClose()
    onOpen("register")
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
        <DialogContent className='h-fit max-h-[100vh] overflow-y-scroll noScroll'>
            <div className='mb-4'>
            <Heading title='Welcom Back!!' subtitle='Login to your account' />
            </div>
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">
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
        <div className='flex flex-col gap-2'>
                 <Separator />
        <span className='text-blue-500 text-sm font-semibold cursor-pointer hover:opacity-70 transition'>FORGOT PASSWORD</span>
        </div>
        <Button disabled={isLoading} type="submit">Login</Button>
        <div className='flex flex-col gap-2'>
                    <Separator />
        <span className='text-blue-300 cursor-pointer text-sm hover:opacity-70 transition' onClick={() => openReg()}>new here? register</span>
            </div>
      </form>
    </Form>
        </DialogContent>
    </Dialog>
  )
}
