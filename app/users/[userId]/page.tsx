import getCurrentUser from '@/actions/getCurrentUser'
import getUser from '@/actions/getUser'
import Image from 'next/image'
import React from 'react'
import { redirect } from 'next/navigation'
import { userWithInfo } from '@/types'
import UserProfile from '@/components/UserProfile'


export default async function page({params}: {params: {userId: string}}) {
  const user: userWithInfo | null = await getUser(params.userId);
  const currentUser = await getCurrentUser()

  if (!user) {
    return redirect("/")
  }

  return (
    <UserProfile user={user} currentUser={currentUser} />
  )
}
