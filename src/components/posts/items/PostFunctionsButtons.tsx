"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import * as api from '@/helpers/todos/todos'
import { SuccessMessage } from '@/components/ui/successMessage/SuccessMessage';

interface Props {

    _idUserPost: string;
    _idSesion?: string
    _idPost: string;
    status: string;
   
}


export default function PostFunctionsButtons({ _idUserPost, _idSesion, _idPost, status}: Props) {

    const router = useRouter();
    
    const[msg,setMsg] = useState<string | null>(null);
   
    //HANDLE STATUS CON RESTFUL API
    const handleStatus = async (id: string, status: string) => {

        try {

           await api.updateTodoStatus(id, status);

            router.refresh()

        } catch (error) {

            console.log(error)

        }

    }

    //HANDLE STAUTS CON SERVER ACTIONS LLAMAMOS DIRECTAMENTE A LA FUNCTION { handleStatus } from "@/actions/action";


    const handleDelete = async (id: string) => {

        setMsg(null);

        try {

            await api.deleteTodo(id);

            setMsg('Task deleted successfuly');
            router.refresh()
            
            setTimeout(() => {
                setMsg(null);
            }, 3000);


        } catch (error) {

            if (error instanceof Error) {
                setMsg(error.message);

                setTimeout(() => {
                    setMsg(null);
                }, 3000);
            } else {
                setMsg('Unknown error happened');

                setTimeout(() => {
                    setMsg(null);
                }, 3000);
            }

        }



    }

    return (

        <>
            {   
                _idUserPost === _idSesion && (
                    <div className="w-full flex flex-row flex-wrap gap-3 " key={_idPost}>

                        {   //SI LA TASK NO ESTA COMPLEATAD MOSTRAMOS LOS BOTONES PARA CAMBIAR STATUS
                            status !== 'done' && (
                                <>
                                    <button
                                        className="bg-green-600 hover:bg-green-700 transition-all duration-300 p-2 rounded-xl"
                                        onClick={() => handleStatus(_idPost, "in_progress")}
                                    >
                                        Start
                                    </button>

                                    <button
                                        className="bg-red-500 hover:bg-red-600 transition-all duration-300 p-2 rounded-xl"
                                        onClick={() => handleStatus(_idPost, "done")}
                                    >
                                        Finish
                                    </button>

                                    <button
                                        className="bg-red-800 hover:bg-red-900 transition-all duration-300 p-2 rounded-xl"
                                        onClick={() => handleStatus(_idPost, "cancelled")}
                                    >
                                        Cancell
                                    </button>
                                </>
                            )
                        }
                        <button 
                            className="bg-red-600 hover:bg-red-700 transition-all duration-300 p-2 rounded-xl"
                            onClick={() => handleDelete(_idPost)}
                        >
                            Delete
                        </button>
                    </div>
                )
            }

            {
                msg && <SuccessMessage message={msg} bg='bg-red-400' />
            }

        </>




    )
}
