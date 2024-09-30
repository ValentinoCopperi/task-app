"use client"

import React, { useState } from 'react'
import * as api from '@/helpers/index'
import { useRouter } from 'next/navigation'


interface Props {
    id: string;
}

export default function AddComents({ id }: Props) {

    const [commentInput, setCommentInput] = useState("")
    const [msgResponse, setMsgResponse] = useState<string | null>(null)
    const router = useRouter();

    const handleAddComment = async (id: string, comment: string) => {
        if (comment.length <= 0) return;
        try {
            await api.addComent(id, comment)

            setMsgResponse("Comment added");

            setTimeout(() => {
                setMsgResponse(null)
            }, 3000);

            router.refresh()
        } catch (error) {
            if (error instanceof Error) {
                setMsgResponse(error.message === 'Unauthorized' ? 'Must be logged in' : error.message);

                setTimeout(() => {
                    setMsgResponse(null);
                }, 3000);
            } else {
                setMsgResponse('Unknown error happened');

                setTimeout(() => {
                    setMsgResponse(null);
                }, 3000);
            }
        }
    }





    return (
        <div className="w-full mb-3">
            <input
                type="text"
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // Add state and onChange handler as needed
            />
            <div className='flex items-center text-nowrap flex-nowrap'>
                <button

                    onClick={() => handleAddComment(id, commentInput)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                // Add onClick handler to submit the comment
                >
                    Post Comment
                </button>
                {
                    msgResponse && <h1 className={`${msgResponse === 'Must be logged in'? 'text-red-700 ':'text-blue-500'} uppercase mx-3`}> {msgResponse} </h1>
                }
            </div>
        </div>
    )
}
