import React from 'react'
import { Posts, UserData } from '@/types'
import Profile from '@/components/profile/Profile';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getProfile(id: string): Promise<UserData> {

  const res = await fetch(`${API_URL}/api/users/${id}`, {  next : { revalidate : 60 } } )

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.message);
  }

  return data.user;

 
}

async function getTasks(id: string): Promise<Posts[]> {
  const res = await fetch(`${API_URL}/api/tasks/user/${id}`, { next : { revalidate : 60 }  })

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.message);
  }

  return data.tasks;
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