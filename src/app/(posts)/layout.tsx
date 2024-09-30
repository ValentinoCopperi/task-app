import { SideBar } from '@/components';
import NotifyCookieChange from '@/components/cookies/NotifyCookieChange';
import ProfileMenu from '@/components/profile-menu/ProfileMenu';
import SearchUsers from '@/components/search/Search';
import Search from '@/components/search/Search';
import SideBarDesktop from '@/components/ui/SideBarDesktop';
import { cookies } from 'next/headers';
import React, { ReactNode } from 'react';
import  jwt  from 'jsonwebtoken';
import { DecodedToken } from '@/types';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const useCookies = cookies()
    
  const token = String(useCookies.get('TOKENUSER')?.value);

  const sessionData  = jwt.decode(token) as DecodedToken;


  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-x-7">
      <div className=" h-full  lg:col-span-2">
        <SideBar />
        <SideBarDesktop />
      </div>

      <div className={` lg:m-0 w-[90%] mx-auto pt-14 lg:pt-4 col-span-1 mt-4 md:col-span-6 ${sessionData ? 'lg:col-span-4 ' : 'lg:col-span-5'}`}>
        {children}
      </div>

      {
        sessionData && (
          <div className=' hidden lg:block lg:col-span-2 h-full '>
            <ProfileMenu profile={sessionData} />
          </div>
        )
      }

    </div>
  );
}
