import Link from 'next/link'
import React from 'react'

interface Props {
    href? : string;
    text?: string
}

export default function ButtonVolverHome({ href = '/' , text = 'Volver' } : Props) {
  return (
    <Link href={href} className='absolute top-4 right-5  text-blue-400 underline cursor-pointer '> {text} </Link>
  )
}
