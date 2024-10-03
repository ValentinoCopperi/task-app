"use client"
import { DecodedToken, Posts } from "@/types";
import { PostItem } from "./items/PostItems";
import Link from "next/link";
import { Pagination } from "../pagination/Pagination";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import * as jwt_decode from "jwt-decode";


interface Props {
    posts: Posts[],
    totalPages?: number;
}



export const PostList = ({ posts, totalPages = 1 }: Props) => {

    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
    const path = usePathname();

    useEffect(() => {
        const token = Cookies.get("SESSION_USER");
        if (token) {
            const decoded : DecodedToken = jwt_decode.jwtDecode(token);
            setDecodedToken(decoded);
        }
    }, [ Cookies.get('SESSION_USER') ]);
   

    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">Posts not found!</h1>
                    <p className="text-gray-200 mb-6">
                        It seems like there are no posts available at the moment. Please try again later or go back to the homepage.
                    </p>
                    <Link href={"/"}>
                        <button
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
                            Volver
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full  ">
            <div className="flex flex-col  gap-8 w-full">
                {posts.map((post) => (
                    <PostItem post={post} key={post._id} profile={decodedToken} />
                ))}
            </div>
            {
                path === "/" && <Pagination totalPages={totalPages} />
            }
        </div>
    );
};