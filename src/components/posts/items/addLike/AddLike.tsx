"use client"
import { DecodedToken, Posts } from '@/types'
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoHeartDislikeCircle, IoHeartOutline } from 'react-icons/io5'
import * as api from '@/helpers/index'


interface Props {
    post: Posts;
    profile? : DecodedToken | null;
    setError : ( error : string | null ) => void
}

export default function AddLike({ post, profile ,setError }: Props) {

    const router = useRouter();
    
    const addLike = async (id: string) => {

        try {

            await api.addLike(id);

            router.refresh();

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message === 'Unauthorized' ? 'Must be logged in' : error.message);

                setTimeout(() => {
                    setError(null);
                }, 3000);
            } else {
                setError('Unknown error happened');

                setTimeout(() => {
                    setError(null);
                }, 3000);
            }

        }

    }

    const deleteLike = async (id: string) => {

        try {

            await api.deleteLike(id);

            router.refresh();

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message);

                setTimeout(() => {
                    setError(null);
                }, 3000);
            } else {
                setError('Unknown error happened');

                setTimeout(() => {
                    setError(null);
                }, 3000);
            }

        }

    }

    return (
        <>
            {post.likes.some(like => profile?.username === like.username) ?
                <button onClick={() => deleteLike(post._id)}>
                    <IoHeartDislikeCircle size={40} />
                </button>

                :

                <button onClick={() => addLike(post._id)}>
                    <IoHeartOutline size={40} />
                </button>
            }
        </>
    )
}
