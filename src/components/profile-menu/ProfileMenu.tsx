import { Posts } from '@/types'
import React from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Props {
  profile : { _id: string, username: string }
}

async function getTasks(id: string): Promise<Posts[]> {
  const res = await fetch(`${API_URL}/api/tasks/user/${id}`, { cache: 'no-cache' })

  const data  =  await res.json();

  if (!data.ok) {
    throw new Error('Failed to fetch user data');
  }

  return data.tasks;
}

const getTotalLikes = (posts: Posts[]) => {

  let totalLikes = 0;

  posts.forEach((post) => {
    totalLikes += post.likes.length
  })

  return totalLikes;

}


export default async function ProfileMenu({ profile }: Props) {


  const posts = await getTasks(profile._id)

  const totalLikes = getTotalLikes(posts)

  return (
    <div className='relative mt-10  w-full'>
      <div className='absolute w-[90%] mx-auto bg-gray-800 rounded-3xl'>

        <div className='w-full bg-gray-900 h-[80px]' />


        <div className="flex flex-col items-center space-y-3 my-8">
          <div className='p-10 bg-gray-500 rounded-full text-4xl font-semibold'>
            {profile.username.slice(0, 1).toLocaleUpperCase()}
          </div>
          <h3 className="text-2xl font-semibold text-gray-200">{profile.username}</h3>


          <p> Description </p>
        </div>

        <div className='w-[90%] mx-auto h-[4px] rounded-lg bg-slate-500' />

        <div className='flex items-start justify-evenly py-4'>

          <div className='bg-gray-900 py-3 px-5 rounded-lg text-center'> 

            <h5>Total Posts:</h5>
            <p>{posts.length} </p>
            
          </div>

          <div className='bg-gray-900  py-3 px-5 flex rounded-lg flex-col text-center'> 

            <h5>Posts Likes:</h5>
            <p> {totalLikes} </p>

          </div>

        </div>

      </div>
    </div>
  )
}
