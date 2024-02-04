"use client"

import { useModal } from '@/hooks/useModel'
import React, {useCallback, useEffect, useRef, useState} from 'react'
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
import toast from "react-hot-toast"
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
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import Image from 'next/image'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/firebase'

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

export const addImage = (file: any, isArray: boolean, state: any, loadingState: any) => {
loadingState(true)
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
        toast.error("something went wrong")
        loadingState(false)
       console.log(error.name)
    switch (error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      if (isArray) {
           state((prev: any) => [...prev, downloadURL])
      } else {
        state(downloadURL)
      }
      loadingState(false)
    });
  }
);
}

export default function AddProjectModel() {
    const {onOpen, data, isOpen, onClose, type} = useModal()
    const open = type === "addProject" && isOpen
    const {currentUser, isEditingProject, project} = data
    const [images, setImages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)


    const form = useForm<z.infer<typeof addPorjectSvhemea>>({
        resolver: zodResolver(addPorjectSvhemea),
        defaultValues: {
            name: "",
            description: "",
            moreToKnow: "", 
        }
    })

   const router = useRouter()

   const change = useCallback(() => {
            setImages(isEditingProject !== undefined && isEditingProject === true && project !== undefined ? project.images : [])
   }, [isEditingProject, project])

   useEffect(() => {
            change()
            form.setValue("name", isEditingProject !== undefined && isEditingProject === true && project !== undefined ? project.name : "")
            form.setValue("description", isEditingProject !== undefined && isEditingProject === true && project !== undefined ? project.description : "")
            form.setValue("moreToKnow", isEditingProject !== undefined && isEditingProject === true && project !== undefined ? project.moreToKnow: "")
   }, [project, isEditingProject, form, change])

    const onSubmit = (values: z.infer<typeof addPorjectSvhemea>) => {
      if (isEditingProject) {
      setIsLoading(true)
       if (images.length <= 0) {
        toast.error("provide one image for your project")
       }

       axios.put(`/api/project/${project?.id}`, {
        name: values.name,
        desc: values.description,
        more: values.moreToKnow,
        images: images
       }).then(() => {
        toast.success("project edited")
        onClose()
        router.refresh()
       }).catch((err) => {
        toast.error(err.response.data)
       }).finally(() => {
        setIsLoading(false)
       })
      } else {
      setIsLoading(true)
       if (images.length <= 0) {
        toast.error("provide one image for your project")
       }

       axios.post("/api/project", {
        name: values.name,
        desc: values.description,
        more: values.moreToKnow,
        images: images
       }).then(() => {
        toast.success("project added")
        onClose()
        router.refresh()
       }).catch((err) => {
        toast.error(err.response.data)
       }).finally(() => {
        setIsLoading(false)
       })
      }
    }

    const inutRef = useRef<HTMLInputElement | null>(null)

    const upload = (e: any) => {
      if (isLoading) {
        return null;
      }
      const file = e.target.files[0]
      addImage(file, true, setImages, setIsLoading)
    }

    const remove = (remove: string) => {
       setImages((prev) => prev.filter((data) => data !== remove))
    }

    const name = form.watch("name");
    const desc = form.watch("description");
    const more = form.watch("moreToKnow");

    

  return (
        <Dialog open={open} onOpenChange={() => onClose()}>
         <DialogContent className='h-fit max-h-[100vh] overflow-y-scroll noScroll'>
          <div className='mb-4'>
              <Heading title='Show Your Work' subtitle={isEditingProject ? "Edit Project" :'Add Project'} center />
          </div>
              <Separator />
              <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">
                  <input hidden type='file' ref={inutRef} onChange={(e) => upload(e)} />
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
                                    <FormField
        disabled={isLoading}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriptipn</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                                    <FormField
        disabled={isLoading}
          control={form.control}
          name="moreToKnow"
          render={({ field }) => (
            <FormItem>
              <FormLabel>More To Know</FormLabel>
              <FormControl>
                <Input placeholder="More Information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-[5px]'>
          <span className='mb-4 text-md font-bold dark:text-neutral-600 text-neutral-300'>Images</span>
           <ScrollArea className='md:w-96 w-60 whitespace-nowrap rounded-md border'>
            <div className='flex w-max x-space-4 p-4'>
              <div className={`cursor-pointer h-40 w-40 border-dashed border-[1px]  rounded-md flex justify-center items-center hover:opacity-70 transition ${isLoading ? "dark:border-neutral-800 border-neutral-600" : "dark:border-neutral-600 border-neutral-400"}`} onClick={isLoading ? () => null :() => inutRef.current?.click()}>
                Add Image
              </div>
              {images.map((url) => (
            <div className={`cursor-pointer h-40 w-40 border-dashed border-[1px] dark:border-neutral-600 border-neutral-400 rounded-md flex justify-center items-center hover:opacity-70 transition relative`} key={url} onClick={() => remove(url)}>
                <Image src={url} alt="work" fill />
              </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
           </ScrollArea>
           </div>
        <Button disabled={isLoading || (name === project?.name && desc === project?.description && more === project?.moreToKnow && images === project?.images)} type="submit">{isEditingProject ? "Save" : "Add"}</Button>
                 </form>
              </Form>
        </DialogContent> 
          </Dialog>

  )
}
