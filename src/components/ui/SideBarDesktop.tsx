"use client"
import React, { useEffect, useState } from 'react'
import SideBarItems from './SideBarItems'
import SearchUsers from '../search/Search'
import { usePathname } from 'next/navigation';

export default function SideBarDesktop() {

    const [searchOpen , setSearchOpen] = useState<boolean>(false)

    const pathname = usePathname();

    const handleSearchOpen = () => {
        setSearchOpen(prev => !prev)
    }

    useEffect(()=>{
        setSearchOpen(false)
    },[pathname])

    return (
        <div className='hidden lg:block h-full'>
            <nav
                className=" flex flex-col items-baseline fixed w-1/6 px-5 overflow-y-auto  bg-black   h-full z-20 border-r shadow-2xl transform  transition-all duration-300">

                <SideBarItems handleSearchOpen={handleSearchOpen} />

            </nav>
          { searchOpen &&  <SearchUsers  handleSearchOpen={handleSearchOpen} /> }
        </div>
    )
}
