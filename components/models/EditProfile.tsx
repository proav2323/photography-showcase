"use client"

import { useModal } from '@/hooks/useModel'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog';
import Heading from '../Heading';
import { Button } from '../ui/button';
import * as z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Image from 'next/image';
import { addImage } from './AddProjectModel';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const Schema = z.object({
    firstName: z.string().min(1, {message: "first name is required"}),
    lastName: z.string().min(1, {message: "last name is required"}),
    bio: z.string().min(1, {message: "bio is required"}).optional(),
    occupation: z.string().min(1, {message: "occupation is required"}).optional(),
    location: z.string().min(1, {message: "location is required"}).optional(),
    websiteUrl: z.string().min(1, {message: "website url is required"}).optional(),
})


export default function EditProfile() {
    const {data, isOpen, type, onClose, onOpen} = useModal();
    const open = isOpen && type === "editProfile"
    const {currentUser} = data;
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            firstName: "",
            lastName: "",
        }
    })

    const [profileImg, setProfileImg] = useState< string | undefined>("");
    const [bannerImg, setBannerImg] = useState<string | undefined>("");



    useEffect(() => {
        if (currentUser) {

        form.setValue("firstName", currentUser.firstName)
        form.setValue("lastName", currentUser.lastName)
        form.setValue("bio", currentUser.bio ?  currentUser.bio : undefined)
        setProfileImg(currentUser.profileImg ? currentUser.profileImg : undefined)
        setBannerImg(currentUser.bannerImg ? currentUser.bannerImg : undefined)
        form.setValue("occupation", currentUser.occupation ? currentUser.occupation : undefined)
        form.setValue("location", currentUser.location ? currentUser.location : undefined)
        form.setValue("websiteUrl", currentUser.websiteUrl ? currentUser.websiteUrl : undefined)
        }
    }, [currentUser, form])

    const router = useRouter();

    const onSubmit = (values: z.infer<typeof Schema>) => {
       setIsLoading(true);
       const data = {...values, profileImg: profileImg, bannerImg: bannerImg}
       axios.put(`/api/user/`, data).then(() => {
           toast.success("user updated")
           onClose()
           router.refresh()
       }).catch((Err) => {
        toast.error(Err.response.data)
       }).finally(() => {
        setIsLoading(false);
       })
    }

    const profileRef = useRef<HTMLInputElement | null>(null);
    const bannerRef = useRef<HTMLInputElement | null>(null);

    const addProfile = (e: any) => {
        if (isLoading) {
            return;
        }
        const file = e.target.files[0];
        addImage(file, false, setProfileImg, setIsLoading)
    }

        const addBanner = (e: any) => {
        if (isLoading) {
            return;
        }
        const file = e.target.files[0];
        addImage(file, false, setBannerImg, setIsLoading)
    }


    
  return (
    <>
    {currentUser !== null && currentUser !== undefined ? (
    <Dialog open={open} onOpenChange={() => onClose()}>
       <DialogContent className='h-fit max-h-[100vh] overflow-y-scroll noScroll flex flex-col justify-start items-start'>
        <div className='my-3'>
              <Heading title='Edit Profile' subtitle='edit your bio'/>
        </div>
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">
        <div className='md:flex-row flex-col flex justify-between items-center gap-2'>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. Jack" {...field} />
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
              <FormLabel>last Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <FormField
          disabled={isLoading}
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>Your Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    <FormField
          disabled={isLoading}
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>occupation</FormLabel>
              <FormControl>
                <Input placeholder="eg. graphic design" {...field} />
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
              <FormLabel>location</FormLabel>
              <FormControl>
                <Input placeholder="eg. India" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

            <FormField
          disabled={isLoading}
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>website Url</FormLabel>
              <FormControl>
                <Input placeholder="eg. https://youtube.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex md:flex-row flex-col justify-between items-center gap-2'>
            <input type='file' hidden ref={profileRef} onChange={(e) => addProfile(e)} />
            <input type='file' hidden ref={bannerRef} onChange={(e) => addBanner(e)} />
            {profileImg ? (
                <Image src={profileImg} width={70} height={70} alt='' onClick={() => setProfileImg(undefined)} />
            ) : (
            <Button type='button' disabled={isLoading} onClick={() => profileRef.current?.click()}>
                Choose Profile Image
            </Button>)}
            {bannerImg ? (
                <Image src={bannerImg} width={100} height={70} alt='' onClick={() => setBannerImg(undefined)} />
            ) : (
            <Button type='button' disabled={isLoading} onClick={() => bannerRef.current?.click()}>
                Choose Banner Image
            </Button>)}
        </div>
        

        <Button disabled={isLoading} type="submit">Save</Button>
    </form>
        </Form>
       </DialogContent>
    </Dialog>
    ) : (
      <Dialog open={open} onOpenChange={() => onClose()}>
       <DialogContent className='h-fit max-h-[100vh] overflow-y-scroll noScroll flex'>
           <Heading title='Login First' subtitle='login to update your profile' />
           <Button className='my-3' onClick={() => onOpen("Login")}>Login</Button>
       </DialogContent>
    </Dialog>
    )}
    </>
  )
}
