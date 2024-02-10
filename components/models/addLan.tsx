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
import { level as l } from '@prisma/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export const Schemaa = z.object({
    name: z.string().min(1, {message: "name is required"}),
    level: z.string()
})

export default function AddLan() {
    const {onOpen, onClose, isOpen, type} = useModal()
    const open = type === "addLan" && isOpen

    const form = useForm<z.infer<typeof Schemaa>>({
        resolver: zodResolver(Schemaa),
        defaultValues: {
            name: "",
            level: l.BEGGINER
        }
    })
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (values: z.infer<typeof Schemaa>) => {
       setIsLoading(true);
       const data = {...values}
       axios.post("/api/lan/", data).then((data) => {
        toast.success("lanuage added")
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
                 <Heading title='add langauge' subtitle='add your known langauge' />
            </div>
            
            <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">

        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Langauge name</FormLabel>
              <FormControl>
                <Input placeholder="eg. Hindi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Level Of Knowledge</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={(value) => form.setValue("level", value)}>
  <SelectTrigger className="w-full">
    <SelectValue className='w-full' placeholder="Level" />
  </SelectTrigger>
  <SelectContent className='w-full'>
    <SelectItem value={l.BEGGINER}>{l.BEGGINER}</SelectItem>
    <SelectItem value={l.INTERMEDIATE}>{l.INTERMEDIATE}</SelectItem>
    <SelectItem value={l.ADVANCED}>{l.ADVANCED}</SelectItem>
  </SelectContent>
</Select>
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
