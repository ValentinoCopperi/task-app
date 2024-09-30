"use client";
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react'


interface Product {
    id: string;
    name: string;
    price: number
}

interface Products {
    products: Product[];
}

interface CartItem {
    [id: string]: number;
}

export interface Cart {
    items: CartItem;
}

const products = [
    {
        id: '23123D',
        name: "T-Shirt",
        price: 20,
    },
    {
        id: 'DADS91',
        name: "Jeans",
        price: 40,
    },
    {
        id: '1210SD',
        name: "Jacket",
        price: 60,
    }, {
        id: 'XXX912',
        name: "Shoes",
        price: 50,
    }


]

export const cartQuant = (cart : Cart) : number => {

    let cant = 0;
  
    Object.values( cart.items ).forEach( value => cant += value )
  
    return cant;

}

export const getCart = (): Cart => {
    return hasCookie('cart')
      ? JSON.parse(getCookie('cart') as string)
      : { items: {} };
  };
  

export default function Products() {

    const router = useRouter();

    const addProduct = (id: string) => {
        const cart = getCart();
        
        if(cart.items[id]){
            cart.items[id] += 1
        }else{
            cart.items[id] = 1
        }

        setCookie('cart' , JSON.stringify(cart));

        router.refresh();
    }

    const deleteProduct = (id : string) => {

        const cart = getCart();

        delete cart.items[id]

        setCookie('cart' , JSON.stringify(cart));

        router.refresh();

    }

    const deleteOne = ( id : string) => {

        const cart = getCart();

        const quant = cartQuant(cart)
        

        if(quant > 0){


            if(cart.items[id]>=1){
                cart.items[id]--
            }else{
                delete cart.items[id]
            }
          
            setCookie('cart' , JSON.stringify(cart));
            router.refresh();
        }
    }

    return (
        <div className='w-[90%] mx-auto bg-slate-400 flex items-center justify-center flex-wrap py-3 my-3'>
            {
                products.map(prod => (
                    <div key={prod.id} className='flex m-4 flex-col items-center justify-center text-center bg-gray-700 p-5 rounded-lg'>
                        <h1>{prod.name}</h1>
                        <span className='text-blue-500 font-semibold'> {prod.price} </span>
                        <button onClick={() => addProduct(prod.id)} className='bg-blue-500 rounded-md p-2'>Add To Cart</button>
                        <button onClick={() => deleteOne(prod.id)} className='bg-blue-800 my-3 rounded-md p-2'>Delete One</button>
                        <button onClick={() => deleteProduct(prod.id)} className='bg-blue-900 rounded-md p-2'>Delete All</button>
                    </div>
                ))
            }
        </div>
    )
}
