"use client";
import React, { FormEvent, useState } from 'react';
import TaskInput from './TaskInput';
import TaskFilters from './TaskFilters';
import { Category } from '@/types';
import { useRouter } from 'next/navigation';
import { SuccessMessage } from '../ui/successMessage/SuccessMessage';
import * as api from '@/helpers/index';

interface Props {
    categories: Category[];
}


interface CreateTaskDto {
    title: string;
    description: string;
    categories:  Category | undefined;
}


const SUCCESS_MESSAGE = 'Tarea creada correctamente';
const ERROR_MESSAGES = {
    UNAUTHORIZED: 'Unauthorized. Please login!',
    FIELDS_REQUIRED: 'Please fill in all fields.',
};

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

        // Validación de campos vacíos
        if (!title || !description || !selectedCategory) {
            setError(ERROR_MESSAGES.FIELDS_REQUIRED);
            return; // Salir si hay campos vacíos
        }

        const data: CreateTaskDto = {
            title,
            description,
            categories: categories.find(cat => cat._id === selectedCategory),
        };

        try {
            await api.createTodo(data);
            clearForm();
            showSuccessMessage(SUCCESS_MESSAGE);
            router.refresh();
        } catch (err: unknown) {
            setError("Error! .Please check to be logged in"); // Corregimos el nombre de la variable 'error'
        }
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setSelectedCategory('');
    };

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
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
                    <h1 className='text-red-300 text-ellipsis text-2xl uppercase text-center'>{error}</h1>
                )}
                {successMessage && <SuccessMessage message={successMessage} bg='bg-green-400' />}
            </div>
        </form>
    );
}
