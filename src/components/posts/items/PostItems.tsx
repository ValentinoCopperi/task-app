"use client"
import { DecodedToken, Posts, Status } from "@/types";
import Link from "next/link";
import { useState } from "react";
import DateTimeDisplay from "../timePostCreated/TimePost";
import style from './posts.module.css'
import PostFunctionsButtons from './PostFunctionsButtons';
import { SuccessMessage } from "@/components/ui/successMessage/SuccessMessage";
import AddComents from "./addComment/AddComents";
import LikeCommentsVisibility from "./Likes-Comments/LikeCommentsVisibility";
import AddLike from "./addLike/AddLike";


interface Profile {
    _id: string;
    username: string;
}

interface Props {
    post: Posts,
    profile? : DecodedToken  | null
}



export const PostItem = ({ post , profile }: Props) => {


    const [error, setError] = useState<string | null>(null);


    const getStatusClass = (status: Status) => {
        switch (status) {
            case 'pending':
                return style.taskStatusPending;
            case 'cancelled':
                return style.taskStatusCancelled;
            case 'done':
                return style.taskStatusDone;
            case 'in_progress':
                return style.taskStatusInProgress
            default:
                return '';
        }
    };


    return (

        <article key={post._id} className=" relative w-[90%] mx-auto bg-gray-800 rounded-md ">

            <div className="absolute top-5 right-2">
                <div className='p-3 bg-gray-500 rounded-s-full font-semibold'>
                    {post.user.username.slice(0, 1).toLocaleUpperCase()}
                </div>
            </div>

            <div className="w-[90%] mx-auto py-4">

                <div className="flex items-center gap-x-3">

                    <h1 className={`text-2xl font-bold text-white break-words  ${post.status === 'done' && 'line-through'}  `}>
                        {post.title.toUpperCase()}
                    </h1>

                    <div>
                        <AddLike post={post} setError={setError} profile={profile} />

                    </div>

                </div>

                <Link href={`/category/${post.categories._id}`} className="inline-block px-6 py-1 rounded-full text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                    {post.categories.name}
                </Link>

                <p className="text-sm text-gray-400 pt-2">
                    <span className="font-semibold text-gray-300">Posted by:</span>
                    <Link className="underline text-blue-500 hover:text-blue-400 transition-colors duration-300" href={`/profile/${post.user._id}`}> {post.user.username} </Link>
                </p>

                <p className="text-gray-400">
                    <span className=" font-semibold text-gray-300">Status: </span>
                    <span className={getStatusClass(post.status)}>
                        {post.status.toLocaleUpperCase()}
                    </span>
                </p>

                

               


                <div>
                    <span className="font-semibold text-gray-300">Decription:</span>
                    <div className="rounded-md min-h-8 bg-slate-900">
                        <h1 className="p-2 break-words "> {post.description} </h1>
                    </div>
                </div>

                <div className="text-sm text-gray-400">
                    <DateTimeDisplay createdAt={post.createdAt} />
                </div>

                <div className='w-[full] my-2  h-[4px] rounded-lg bg-slate-500' />

                <div>

                    <LikeCommentsVisibility post={post} profile={profile} />

                    <AddComents id={post._id} />

                </div>

                <div>
                    <PostFunctionsButtons _idUserPost={post.user._id} _idSesion={profile?._id} _idPost={post._id} status={post.status}  />
                </div>

            </div>

            {
                error && <SuccessMessage message={error} bg="bg-red-400" />
            }

        </article>

        
    );
};