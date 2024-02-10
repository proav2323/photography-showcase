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


export const Schemaa = z.object({
    company: z.string().min(1, {message: "comapny is required"}),
    location: z.string().min(1, {message:"location is required"}),
    position: z.string().min(1, {message: "position is required"}),
})

export default function AddExperince() {
    const {onOpen, onClose, isOpen, type} = useModal()
    const open = type === "addExp" && isOpen

    const form = useForm<z.infer<typeof Schemaa>>({
        resolver: zodResolver(Schemaa),
        defaultValues: {
            company: "",
            location: "",
            position: "",
        }
    })
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartingDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const onSubmit = (values: z.infer<typeof Schemaa>) => {
       if (!startDate) {
        toast.error("start date is required")
        return;
       }
       setIsLoading(true);
       const data = {...values, startDate: startDate, endDate: endDate}
       axios.post("/api/exp/", data).then((data) => {
        toast.success("exp added")
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
                 <Heading title='add Experince' subtitle='add work experince' />
            </div>
            
            <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">

        <FormField
          disabled={isLoading}
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="eg. google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                <FormField
          disabled={isLoading}
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="eg. America" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                <FormField
          disabled={isLoading}
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="eg. Junio Web Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-row justify-between items-center w-full gap-2'>

         <DatePicker disabled={isLoading} date={startDate} setDate={setStartingDate} title='Choose Start Date' />
         <DatePicker disabled={isLoading} date={endDate} setDate={setEndDate} title='Choose End Date' />
        </div>

        <Button type="submit" disabled={isLoading}>Add</Button>
    </form>  
            </Form>
            
        </DialogContent>
    </Dialog>
  )
}
