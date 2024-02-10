"use client"

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'

export default function DatePicker({setDate, date, title, disabled}: {setDate: any, date: Date | undefined, title: string, disabled: boolean}) {
  return (
        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{title}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Calendar
        disabled={disabled}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
