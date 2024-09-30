"use client"
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function CookiesPage( { cookieTab } : { cookieTab : number } ) {

    const router = useRouter();

    const tabOptions = [1,2,3,4];

    const [selected,setSelected] = useState( cookieTab )


    const onTabSelected = ( tab : number) => {
        setSelected( tab ); 
        //SETEAMOS LA COOKIE DEL LADO DEL CLIENTE -> VALOR SIEMPRE ES STRING;
        setCookie('selectedTab' , tab.toString() );
        //REFRESAMOS LOS COMPONENTES NECESARIOS 
        router.refresh();
    }
  return (
    <div className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${ 'grid-cols-' + tabOptions.length }`}>

        {
            tabOptions.map( tab  => (
                <div key={tab}>
                    <input type="radio" id={tab.toString()} className='peer hidden'checked={selected === tab} onChange={() => {}} />
                    <label 
                        onClick={()=> onTabSelected( tab )}
                        className='block  text-blue-300 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500'>
                        {tab}
                    </label>
                </div>
            ))
        }
        
    </div>
  )
}
