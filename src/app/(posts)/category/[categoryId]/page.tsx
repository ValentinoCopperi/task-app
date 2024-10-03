import { notFound } from 'next/navigation';
import React from 'react'
import { Posts } from '@/types';  // Asegúrate de que estos tipos estén definidos correctamente
import { PostList } from '@/components';
import { Metadata } from 'next';
import ButtonVolverHome from '@/components/ui/buttons/ButtonVolverHome';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Posts By Category`,
    description: 'Post By Category'
  }

}


async function getTaskByCategoryName(name: string): Promise<Posts[] | null> {
  const res = await fetch(`${API_URL}/api/tasks/category/${name}`, { cache: 'no-cache' } );
  
  const data = await res.json();

  if (!res.ok) {
    return null;
  }

  return data.posts;
}




export default async function PostsByCategory({
  params
}: {
  params: { categoryId: string }
}) {

  
  const category = params.categoryId;


  const posts = await getTaskByCategoryName(category);

  if (!category) {
    notFound();
  }

  if (posts?.length === 0 || !posts) {
    return (
      <div>
        <ButtonVolverHome/>
        <h1 className='text-4xl text-center py-8 '>There are no Posts with {category}</h1>
      </div>
    )
  }
  return (
    <>
      <ButtonVolverHome/>
      <div >
        <div className='text-4xl text-center'>
          <span 
            className="inline-block px-9 py-5 mb-4 rounded-full text-5xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            {category.toLocaleUpperCase()}
          </span> 
        </div>
        <PostList posts={posts} />
      </div>
    </>
  )

}