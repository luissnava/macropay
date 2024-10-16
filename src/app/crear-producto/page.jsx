import React from 'react'
import Formulario from '@/components/products/Formularios'
import Modal from '@/components/modales/Modal'
const pageCrearProdcuto = () => {
    return (
        <>
            <Formulario />
            <Modal nuevo={true} />
        </>
    )
}

export default pageCrearProdcuto
