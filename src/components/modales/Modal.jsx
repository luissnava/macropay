"use client";
import { DialogBody, Dialog, Typography, Button, DialogFooter } from '@material-tailwind/react'
import { useContext } from 'react';
import { globalContext } from '@/context/globalContext';
import { useRouter } from 'next/navigation';

const Modal = ({ eliminar, nuevo }) => {

    const { handleOpen, open, eliminarProducto, idProduct } = useContext(globalContext)
    const router = useRouter()

    const handleModal = () => {
        handleOpen()
        router.push("/")
    }

    return (
        <>
            <Dialog className='' open={open} handler={eliminar ? handleOpen : handleModal}>
                <DialogBody className=''>
                    {
                        nuevo ? <Typography as={'h5'} variant='h5'>Producto guardado correctamente</Typography> : <Typography as={'h5'} variant='h5' className=''>{eliminar ? "¿Seguro que quieres eliminar este producto?" : "Datos actualizados con exito"}</Typography>
                    }


                </DialogBody>

                <DialogFooter className='gap-4'>
                    {
                        eliminar ? <>
                            <Button onClick={() => eliminarProducto(idProduct)}>Aceptar</Button>
                            <Button onClick={handleOpen}>Cancelar</Button>
                        </> : <><Button onClick={handleModal}>Aceptar</Button></>
                    }

                </DialogFooter>


            </Dialog>
        </>
    )
}

export default Modal


