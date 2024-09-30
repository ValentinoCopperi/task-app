import { notFound } from 'next/navigation';
import React from 'react'
import { Posts, Category } from '@/types';  // Asegúrate de que estos tipos estén definidos correctamente
import { PostList } from '@/components';
import { Metadata } from 'next';
import ButtonVolverHome from '@/components/ui/buttons/ButtonVolverHome';


export async function generateMetadata({ params }: { params: { categoryId: string } }): Promise<Metadata> {

  const cat = await categoryById(params.categoryId)


  return {
    title: `Posts By ${cat?.name}`,
    description: 'Post By Category'
  }

}


async function getTaskByCategory(id: string): Promise<Posts[] | null> {
  const res = await fetch(`http://localhost:3001/tasks/categories/${id}`, { cache: 'no-cache' } );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function categoryById(id: string): Promise<Category | null> {

  const res = await fetch(`http://localhost:3001/categories/${id}`, { cache: 'force-cache' });
  if (!res.ok) {
    return null; // Retorna null si no existe la categoría
  }
  return res.json();

}


export default async function PostsByCategory({
  params
}: {
  params: { categoryId: string }
}) {

  const [posts, category] = await Promise.all([
    getTaskByCategory(params.categoryId),
    categoryById(params.categoryId)
  ]);

  if (!category) {
    notFound();
  }

  if (posts?.length === 0 || !posts) {
    return (
      <div>
        <ButtonVolverHome/>
        <h1 className='text-4xl text-center py-8 '>There are no Posts with {category.name}</h1>
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
            {category.name}
          </span> 
        </div>
        <PostList posts={posts} />
      </div>
    </>
  )

}