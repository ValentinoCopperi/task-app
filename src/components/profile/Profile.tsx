import { DecodedToken, Posts, UserData } from '@/types'
import Image from 'next/image'
import React from 'react'
import { PostList } from '../posts/PostsGrid'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import BtnOpenModal from './Modal/BtnOpenModal'


interface Props {
    user : UserData,
    posts : Posts[]
}

export default function Profile( { user , posts }  : Props ) {

    const useCookies = cookies()
    
    const token = String(useCookies.get('TOKENUSER')?.value);

    const sessionData  = jwt.decode(token) as DecodedToken;


    
   
    return (
        <>
            <div className="w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg text-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Perfil de Usuario</h2>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <div className='p-10 bg-gray-500 rounded-full text-2xl font-semibold'> 
                        {user.username.slice(0,1).toLocaleUpperCase()} 
                    </div>
                    <h3 className="text-2xl font-semibold text-blue-500">{user.username}</h3>
                </div>

                <div className='space-y-3'>
                    <div className= " bg-gray-700 p-4 rounded-md">
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-lg">{user.email}</p>
                    </div>

                    <div className=" bg-gray-700 p-4 rounded-md">
                        <p className="text-sm text-gray-400">Biography</p>
                        <p className="text-lg">{user.description}</p>
                        
                    </div>
                   {
                    sessionData?._id === user._id && (
                        <BtnOpenModal bio={user.description} />
                    )
                   }
                    

                    {/* {user.location && (
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-400">Ubicación</p>
              <p className="text-lg">{user.location}</p>
            </div>
          )} */}

                    <div className="bg-gray-700 p-4 rounded-md">
                        <p className="text-sm text-gray-400">Fecha de registro</p>
                        <p className="text-lg">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

            </div>

            <div className="w-full h-px bg-gray-200 my-10" />

            {
                posts.length === 0
                    ? <h1 className='text-center text-4xl'> {user.username}  does not have Posts</h1>
                    : <PostList posts={posts} />
            }

        </>
    )
}
