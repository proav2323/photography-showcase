"use client"
import {useRouter} from 'next/navigation'
import Heading from './Heading';
import { Button } from './ui/button';

export default function EmptyState({title = "no Exact mtaches", showReset, subTitle  = "try changing or emoving your filter", url}: {title?: string, subTitle?: string, showReset?: boolean, url: string}) {
    const ruter = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
        <Heading center title={title} subtitle={subTitle} />
        <div className='w-48 mt-4'>
            {showReset && (
                <Button onClick={() => ruter.push(url)} >Reset Filters</Button>
            )}
        </div>
    </div>
  )
}