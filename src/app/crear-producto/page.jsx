import React from 'react'
import Formulario from '@/components/products/Formularios'
import Modal from '@/components/modales/Modal'
export const metadata = {
    title: "Crear un Producto",
    description: "Crear un Producto"
}
const pageCrearProdcuto = () => {
    return (
        <>
            <Formulario />
            <Modal nuevo={true} />
        </>
    )
}

export default pageCrearProdcuto
