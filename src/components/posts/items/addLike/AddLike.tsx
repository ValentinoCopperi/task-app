"use client"
import { DecodedToken, Posts } from '@/types'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoHeartDislikeCircle, IoHeartOutline } from 'react-icons/io5'
import * as api from '@/helpers/index'
import { SuccessMessage } from '@/components/ui/successMessage/SuccessMessage';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


interface Props {
    post: Posts;
    profile?: DecodedToken | null;
    setError: (error: string | null) => void
}

export default function AddLike({ post, profile }: Props) {

    const router = useRouter();

    const [likeStatus, setLikeStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const addLike = async (id: string) => {

        setIsLoading(true);
        setLikeStatus(null);

        try {
            const res = await api.addLike(id);
            setLikeStatus({ message: res.message, isError: false });
            router.refresh();
            setTimeout(() => {
                setLikeStatus(null)
            }, 2000);
            // Optionally, redirect the user or update global state here
        } catch (error) {
            setLikeStatus({
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                isError: true
            });
            setTimeout(() => {
                setLikeStatus(null)
            }, 2000);
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setLikeStatus(null)
            }, 2000);
        }

    }

    const deleteLike = async (id: string) => {

        setIsLoading(true);
        setLikeStatus(null);

        try {
            const res = await api.deleteLike(id);
            setLikeStatus({ message: res.message, isError: false });
            router.refresh();
            setTimeout(() => {
                setLikeStatus(null)
            }, 2000);
            // Optionally, redirect the user or update global state here
        } catch (error) {
            setLikeStatus({
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                isError: true
            });
            setTimeout(() => {
                setLikeStatus(null)
            }, 2000);
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setLikeStatus(null)
            }, 2000);
        }

    }

    return (
        <>
            {isLoading 
                ?

                <AiOutlineLoading3Quarters  size={40}/>

                :
                post.likes.some(like => profile?.username === like.username) ?
                    <button onClick={() => deleteLike(post._id)}>
                        <IoHeartDislikeCircle size={40} />
                    </button>

                    :

                    <button onClick={() => addLike(post._id)}>
                        <IoHeartOutline size={40} />
                    </button>
            }
            {likeStatus && (
                <SuccessMessage message={likeStatus.message} bg={likeStatus.isError ? 'bg-red-400' : 'bg-green-400'} />
            )}
        </>
    )
}
