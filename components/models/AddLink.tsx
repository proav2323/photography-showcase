"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { useModal } from '@/hooks/useModel'
import Heading from '../Heading'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input';
import DatePicker from '../DatePicker'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export const Schemaa = z.object({
    name: z.string().min(1, {message: "name is required"}),
    link: z.string()
})

export default function AddLink() {
    const {onOpen, onClose, isOpen, type} = useModal()
    const open = type === "AddLink" && isOpen

    const form = useForm<z.infer<typeof Schemaa>>({
        resolver: zodResolver(Schemaa),
        defaultValues: {
            name: "",
            link: ""
        }
    })
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (values: z.infer<typeof Schemaa>) => {
       setIsLoading(true);
       const data = {...values}
       axios.post("/api/link/", data).then((data) => {
        toast.success("link added")
        onClose()
        router.refresh();
        form.reset()
       }).catch((err) => {
        toast.error(err.response.data)
       }).finally(() => {
        setIsLoading(false)
       })
    }

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
        <DialogContent className='h-fit max-h-[100vh] overflow-y-scroll noScroll flex flex-col justify-start items-start'>
            <div className='my-3'>
                 <Heading title='add link' subtitle='add your social link' />
            </div>
            
            <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">

        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>platform name</FormLabel>
              <FormControl>
                <Input placeholder="eg. Youtube" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>platform link</FormLabel>
              <FormControl>
                <Input placeholder="eg. https://youtube.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>Add</Button>
    </form>  
            </Form>
            
        </DialogContent>
    </Dialog>
  )
}
