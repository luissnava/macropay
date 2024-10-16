"use client";
import { Card, CardBody, CardHeader, Button, Input } from '@material-tailwind/react'
import React, { useEffect, useContext, useState } from 'react'
import { globalContext } from '@/context/globalContext';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Modal from '../modales/Modal';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from 'next/link';

const Formulario = ({ valueId = null }) => {
    const { consultarProducto, actualizarProducto, agregarProducto, getInitialProductos } = useContext(globalContext)
    const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm()
    const [item, setItem] = useState(null)

    useEffect(() => {

        if (valueId) {

            const record = consultarProducto(valueId.params.id)

            if (record) {
                setItem(record)
                setValue("title", record.title);
                setValue("description", record.description);
                setValue("price", record.price);
                setValue("category", record.category);
                setValue("image", record.image)
            }
        }

    }, [])


    const submit = handleSubmit((data) => {

        if (item) {
            actualizarProducto(valueId.params.id, data)
        } else {
            agregarProducto(data)
        }
    })


    return (
        <>
            <div className="flex items-center gap-5 p-5 mt-5 ml-5">
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                <Link href={"/"} className="hover:underline cursor-pointer text-gray-800 p-2">Regresar</Link>
            </div>

            <div className='w-full flex justify-center items-center'>
                {
                    <Card className="mt-24 w-96">
                        {
                            item && <CardHeader color="blue-gray" className="">
                                <Image src={item.image} width={500} height={500} alt={item.category} className='w-full'></Image>
                            </CardHeader>
                        }

                        <CardBody className='flex flex-col gap-6'>
                            <form onSubmit={submit} className="mt-8 mb-2 max-w-screen-lg">
                                <div className="flex flex-col gap-3">

                                    <Input
                                        size="lg"
                                        label="Titulo"
                                        defaultValue={item ? item.title : ""}
                                        className=""
                                        {...register("title", {
                                            required: {
                                                value: true,
                                                message: "El nombre es requerido"
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "El titulo debe contener al menos 6 caracteres"
                                            },
                                            maxLength: {
                                                value: 200,
                                                message: "EL campo titulo debe tener maximo 200 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

                                    <Input
                                        size="lg"
                                        label="Descripción"
                                        defaultValue={item ? item.description : ""}
                                        className=""
                                        {...register("description", {
                                            required: {
                                                value: true,
                                                message: "Campo requerido"
                                            },
                                            minLength: {
                                                value: 10,
                                                message: "La descripción debe tener minimo 10 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}

                                    <Input
                                        size="lg"
                                        label="Precio"
                                        defaultValue={item ? item.price : ""}
                                        className="w-full"
                                        {...register("price", {
                                            required: {
                                                value: true,
                                                message: "El precio es requerido"
                                            },
                                            pattern: {
                                                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                                message: "Por favor, ingrese un número válido con hasta 2 decimales"
                                            },
                                            min: {
                                                value: 1.0,
                                                message: "El precio debe ser mayor a 0"
                                            },
                                            max: {
                                                value: 9999.99,
                                                message: "El precio no puede ser mayor a 999.99"
                                            }
                                        })}
                                    />
                                    {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}

                                    <select className='border border-gray-500 p-4 rounded-lg' {...register("category", {
                                        required: {
                                            value: true,
                                            message: "La categoría es requerida"
                                        }
                                    })}>
                                        <option value="" defaultValue={item ? item.category : "Selecciona una categoría"}></option>
                                        <option value="ropaHombre">Ropa de hombre</option>
                                        <option value="ropaMujer">Ropa de Mujer</option>
                                        <option value="electronicos">Electronicos</option>
                                    </select>
                                    {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}

                                    <Input
                                        size="lg"
                                        label="Imagen"
                                        defaultValue={item ? item.image : ""}
                                        className=""
                                        {...register("image", {
                                            required: {
                                                value: true,
                                                message: "La imagen es requerida"
                                            },
                                            minLength: {
                                                value: 20,
                                                message: "Ingrese una url valida"
                                            },
                                            maxLength: {
                                                value: 350,
                                                message: "Ingrese una url valida"
                                            },
                                            pattern: {
                                                value: /^https:\/\/.*/i,
                                                message: "Ingrese una url valida"
                                            }
                                        })}
                                    />
                                    {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}

                                </div>

                                <Button className="mt-6" type="submit" fullWidth>
                                    {item ? "Actualizar" : "Crear Producto"}
                                </Button>


                            </form>
                        </CardBody>
                    </Card>
                }

            </div>
            <Modal />
        </>

    )
}

export default Formulario
