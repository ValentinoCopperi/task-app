import { Cart } from '@/components/cookies/productsCookieTest/Products';
import { cookies } from 'next/headers'
import React from 'react'

export default function page() {

    const cookiesStore = cookies()
    const cart : Cart = cookiesStore.has('cart') ? JSON.parse(cookiesStore.get('cart')!.value) : { "items" : {} };
    
    

  return (
    <div>
        <h1>CART</h1>
    </div>
  )
}
