
import { cookies } from 'next/headers'
import React from 'react'
import { Cart } from './productsCookieTest/Products';
import Link from 'next/link';

export const cartQuant = (cart : Cart) : number => {

  let cant = 0;

  Object.values( cart.items ).forEach( value => cant += value )

  return cant;

}


export default function NotifyCookieChange() {
  const cookieStore = cookies();
  //BUSCAMOS LA COOKIE , SI NO EXISTE TENEMOS 1 COMO PREDETEMINADO    
  const numberCookie = Number(cookieStore.get('selectedTab')?.value ?? '1');

  const cart = cookieStore.has('cart') ? JSON.parse(cookieStore.get('cart')!.value) : { "items" : {} };

  const quantity = cartQuant(cart)
  

  return (

    <>
      <div className='bg-blue-500 p-4 rounded-b-lg text-blue-300 fixed top-0 right-0 z-30'>
        <h1> Cookie Tab : {numberCookie} </h1>
        <Link href={"/cookies/cart"} className='underline cursor-pointer'> Products Quant : { quantity } </Link>
      </div>

    </>
  )
}
