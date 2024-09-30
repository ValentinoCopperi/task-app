"use client"
import React, { FormEvent, useState } from 'react'
import TaskInput from './TaskInput'
import TaskFilters from './TaskFilters'
import { createTodo } from '@/helpers'
import { Category } from '@/types'
import { useRouter } from 'next/navigation'
import { SuccessMessage } from '../ui/successMessage/SuccessMessage'



interface Props {
    categories: Category[];
}

export default function TaskForm({ categories }: Props) {

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [successMessage, setSuccessMessage] = useState<string | null>(null);



    const handleCreateTodo = async (e: FormEvent) => {
        
        e.preventDefault();
        setError(null);


        const data = {
            title,
            description,
            categories: categories.find(cat => cat._id === selectedCategory)
        };

        try {
            await createTodo(data);

            // Clear form after successful submission
            setTitle('');
            setDescription('');
            setSelectedCategory('');

            setSuccessMessage('Tarea creada correctamente');

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

            router.refresh();
        } catch (error: any) {
            if(error instanceof Error){
                if(error.message === 'Unauthorized'){
                    setError(error.message + '. Please login!');
                }else{
                    setError(error.message);
                }
                
            }
           
        }
    };

    return (
        <form onSubmit={handleCreateTodo}>
            <div className='flex flex-col space-y-4'>
                <TaskInput
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                />
                <TaskFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <div className="flex justify-end">
                    <button
                        type='submit'
                        className="
                bg-blue-600 
                text-white 
                py-2 
                px-4 
                rounded-lg 
                hover:bg-blue-700 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                transition-colors 
                duration-300        
              "
                    >
                        Crear Post
                    </button>
                </div>
                {error && (
                    <h1 className='text-red-300 text-ellipsis  text-2xl uppercase text-center'>{error}</h1>
                )}
                {successMessage && <SuccessMessage  message={successMessage} bg='bg-green-400' />}
            </div>
        </form>
    );
}