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
import Head from 'next/head'

export const addPorjectSvhemea = z.object({
    name: z.string().min(1, {
        message: "name is required"
    }),
    description: z.string().min(1, {
        message: "Description is Required"
    }).max(500, {
        message: "description can't longer than 500"
    }),
    moreToKnow: z.string().min(1, {
        message: "more to knoew is required"
    }),
})

export default function AddProjectModel() {
    const {onOpen, data, isOpen, onClose, type} = useModal()
    const open = type === "addProject" && isOpen
    const {currentUser} = data
    const [images, setImages] = useState([])


    const form = useForm<z.infer<typeof addPorjectSvhemea>>({
        resolver: zodResolver(addPorjectSvhemea),
        defaultValues: {
            name: "",
            description: "",
            moreToKnow: "", 
        }
    })

    const [isLoading, setIsLoading] = useState(false)

        const onSubmit = (values: z.infer<typeof addPorjectSvhemea>) => {

    }

    if (!currentUser) {
        Toast.error("login first")
        onClose()
        return onOpen("Login")
    }

    

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
        <DialogContent className='h-fit max-h-[100vh] overflow-y-scroll noScroll'>
              <Heading title='Show Your Work' subtitle='Add Project' center />
              <Separator />
              {/* <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">
                            <FormField
        disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                 </form>
              </Form> */}
        </DialogContent>
    </Dialog>
  )
}
