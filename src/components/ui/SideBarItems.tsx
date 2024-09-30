"use client"

import Link from 'next/link'
import { redirect, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoCart, IoHome, IoLogIn, IoLogOut, IoPerson, IoSearch } from "react-icons/io5"
import * as api from '@/helpers/index'
import { hasCookie, getCookie } from 'cookies-next'
import Search from '../search/Search'
import { signIn, useSession } from 'next-auth/react'
import LogoutBtn from './buttons/Logout'

interface Props {
    handleSearchOpen: () => void;
}




export default function SideBarItems({ handleSearchOpen }: Props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const router = useRouter();


    const handleLogout = async () => {
        try {
            await api.logout()
            router.refresh()
        } catch (error) {
            console.log(error)
        }

    }






    useEffect(() => {
        setIsLoggedIn(hasCookie("TOKENUSER"));
    }, [hasCookie("TOKENUSER")]);



    return (
        <>


            {/* TITLE */}

            <Link href={'/'} className="text-3xl pt-4 ">TaskAPP</Link>


            {/* Menu */}




            <div className="w-full h-px bg-gray-200 my-5" />

            <Link
                href="/"
                className={
                    `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all
                        ${pathname === "/" && "bg-gray-800"
                    }
                    `
                }
            >
                <IoHome size={30} />
                <span className="ml-3 text-xl">Home</span>
            </Link>

            <Link
                href="/myProfile"
                className={
                    `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all
                        ${pathname === "/myProfile" && "bg-gray-800"
                    }
                    `
                }
            >
                <IoPerson size={30} />
                <span className="ml-3 text-xl">Profile</span>
            </Link>

            <button
                onClick={handleSearchOpen}
                className={
                    `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all`

                }
            >
                <IoSearch size={30} />
                <span className="ml-3 text-xl">Buscar</span>
            </button>


            {
                isLoggedIn ?
                    (<button
                        onClick={handleLogout}
                        className={
                            `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all`

                        }
                    >
                        <IoLogOut size={30} />
                        <span className="ml-3 text-xl">Logout</span>
                    </button>)
                    :
                    (<>

                        <Link
                            href="/auth/login"
                            className={
                                `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all
                        ${pathname === "/auth/login" && "bg-gray-800"
                                }
                    `
                            }
                        >
                            <IoLogIn size={30} />
                            <span className="ml-3 text-xl">Login</span>
                        </Link>

                        <Link
                            href="/auth/register"
                            className={
                                `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all
                        ${pathname === "/auth/register" && "bg-gray-800"}
                    `
                            }
                        >
                            <IoLogIn size={30} />
                            <span className="ml-3 text-xl">Register</span>
                        </Link>
                    </>)


            }

            {/* <button
                onClick={() => signIn()}
                className={
                    `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all
                    }
                    `
                }
            >
                <IoLogIn size={30} />
                <span className="ml-3 text-xl">Login Next Auth</span>
            </button>


            <LogoutBtn /> */}




        </>
    )
}
