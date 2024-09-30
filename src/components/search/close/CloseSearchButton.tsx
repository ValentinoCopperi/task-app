"use client"



import React from 'react'
import { IoClose } from 'react-icons/io5';

interface Props{
    handleSearchOpen : () => void;
}


export default function CloseSearchButton({handleSearchOpen}:Props) {
  return (
    <IoClose size={60} onClick={handleSearchOpen} color='white' className='absolute top-3 right-4 cursor-pointer'/>
  )
}
