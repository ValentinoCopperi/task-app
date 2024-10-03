"use client"
import { useStore } from "@/store"
import clsx from "clsx"
import { IoCloseOutline, IoMenu } from "react-icons/io5"
import SideBarItems from "./SideBarItems"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import SearchUsers from "../search/Search"
 
export const SideBar = () => {

    const [searchOpen , setSearchOpen] = useState<boolean>(false)

    const pathname = usePathname();

    const handleSearchOpen = () => {
        setSearchOpen(prev => !prev)
    }

    useEffect(()=>{
        setSearchOpen(false)
    },[pathname])

   
    const isSideMenuOpen = useStore(state => state.isSideMenuOpen)
    const closeSideMenu = useStore(state => state.closeSideMenu)
    const openSideMenu = useStore(state => state.openSideMenu)

    return (
        <div className="block lg:hidden">
            <IoMenu
                size={50}
                className={`fixed top-5 z-40 left-5 cursor-pointer  block lg:hidden ${isSideMenuOpen ? 'hidden' : 'block'} `}
                onClick={openSideMenu}
            />

            {/* SideMenu */}

            <nav

                className={
                    clsx(
                        "fixed p-5 left-0 top-0 w-[90%] overflow-y-auto  bg-black   h-screen z-20 border-r shadow-2xl transform  transition-all duration-300",
                        {
                            "-translate-x-full": !isSideMenuOpen
                        }

                    )
                }>
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer block lg:hidden"
                    onClick={closeSideMenu}
                />

                <SideBarItems handleSearchOpen={handleSearchOpen} />

               

            </nav>
            { searchOpen &&  <SearchUsers  handleSearchOpen={handleSearchOpen} /> }

        </div>
    )
}
