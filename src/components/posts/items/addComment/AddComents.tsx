"use client"

import React, { useState } from 'react'
import * as api from '@/helpers/index'
import { useRouter } from 'next/navigation'

interface Props {
    id: string;
}

export default function AddComents({ id }: Props) {
    const [commentInput, setCommentInput] = useState("");
    const [msgResponse, setMsgResponse] = useState<string | null>(null);
    const router = useRouter();

    const handleAddComment = async (id: string, comment: string) => {
        if (comment.length <= 0) {
            setMsgResponse("Comment cannot be empty");
            setTimeout(() => setMsgResponse(null), 3000);
            return;
        }

        try {
            await api.addComent(id, comment);
            setMsgResponse("Comment added");
            router.refresh(); // Refrescar la página
            setTimeout(() => {
                setMsgResponse(null);
            }, 3000);

        } catch (error) {
            if (error instanceof Error) {
                const message = error.message === 'Unauthorized' ? 'Must be logged in' : error.message;
                setMsgResponse(message);
            } else {
                setMsgResponse('An unknown error occurred');
            }

            setTimeout(() => setMsgResponse(null), 3000);
        }
    };

    return (
        <div className="w-full mb-3">
            <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className='flex items-center text-nowrap flex-nowrap'>
                <button
                    onClick={() => handleAddComment(id, commentInput)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Post Comment
                </button>
                {msgResponse && (
                    <h1 className={`${msgResponse === 'Must be logged in' ? 'text-red-700' : 'text-blue-500'} uppercase mx-3`}>
                        {msgResponse}
                    </h1>
                )}
            </div>
        </div>
    );
}
