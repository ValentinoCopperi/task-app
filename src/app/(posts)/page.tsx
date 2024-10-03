import React from 'react';
import type { Category, Posts } from '@/types';
import { PostList } from '@/components';
import TaskForm from '@/components/createPost/TaskForm';
import { getPosts } from '@/actions';




// async function getPosts(): Promise<Posts[]> {
//     const res = await fetch('http://localhost:3001/tasks', { next : { revalidate : 0 } });

//     if (!res.ok) {
//         throw new Error('Failed to fetch Posts');
//     }

//     return res.json();
// }

async function getCategories(): Promise<Category[]> {
    const res = await fetch('https://nestjs-taskapi-production.up.railway.app/categories', { cache: 'force-cache' });

    if (!res.ok) {
        throw new Error('Failed to fetch Categories');
    }

    return res.json();
}


interface Props{
    searchParams : {
        page? : string
    }
}


export default async function Posts( { searchParams }  : Props ) {


   
    const page = searchParams.page ? parseInt( searchParams.page ) : 1;

    const [{postsData , totalPages}, categories ] = await Promise.all([
        getPosts({page,take:3}),
        getCategories(),
    ]);
   

    return (

        <div>

        

            <TaskForm categories={categories} />
          
            <div className="w-full h-px bg-gray-200 my-10" />

            <PostList posts={postsData} totalPages={totalPages} />
            
        </div>
    )
}
