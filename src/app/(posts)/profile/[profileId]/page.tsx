import React from 'react'
import Image from 'next/image'
import { Posts, UserData } from '@/types'
import { PostList } from '@/components';
import Profile from '@/components/profile/Profile';

async function getProfile(id: string): Promise<UserData> {

  const res = await fetch(`http://localhost:3001/users/${id}`, {  next : { revalidate : 60 } } )

  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  return await res.json();

 
}

async function getTasks(id: string): Promise<Posts[]> {
  const res = await fetch(`http://localhost:3001/tasks/user/${id}`, { next : { revalidate : 60 }  })

  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  return await res.json();
}

export default async function UserProfile({
  params
}: {
  params: { profileId: string }
}) {
  const [user, posts] = await Promise.all([
    getProfile(params.profileId),
    getTasks(params.profileId)
  ]);

  return (
    <div>
      <Profile user={user} posts={posts} />
    </div>
  )
}