"use client"

import React from 'react'
import { IoLogOut, IoWarning } from 'react-icons/io5'
import { useSession  , signOut} from 'next-auth/react'

export default function LogoutBtn() {


    const { data: session, status } = useSession()

    if (status === 'loading') {
        return (
            <button
                // onClick={handleLogoutNextAuth}
                className={
                    `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all`

                }
            >
                <IoWarning size={30} />
                <span className="ml-3 text-xl">Loading...</span>
            </button>
        )
    }

    if (status === 'authenticated') {
        return (

            <button
                onClick={() => signOut()}
                className={
                    `flex items-center mt-10 p-2 w-full hover:bg-gray-800  rounded transition-all`

                }
            >
                <IoLogOut size={30} />
                <span className="ml-3 text-xl">Logout</span>
            </button>

        )
    }

    return (
        <></>
    );

}
