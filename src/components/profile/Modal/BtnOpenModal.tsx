"use client"
import React, { useState } from 'react'
import ModalBiography from './ModalBiography'

export default function BtnOpenModal( {bio} : { bio : string | undefined } ) {

    const [modalOpen, setModalOpen] = useState(false)

    const handleModalBiography = () => {
        setModalOpen(prev => !prev)
    }

    return (
        <>
            <p onClick={handleModalBiography} className="cursor-pointer text-blue-500 underline">Edit Biography</p>
            {
                modalOpen === true && <ModalBiography bio={bio} handleModalBiography={handleModalBiography} />
            }

        </>


    )
}
