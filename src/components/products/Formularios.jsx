"use client";
import { Card, CardBody, CardHeader, Button, Input } from '@material-tailwind/react'
import React, { useEffect, useContext, useState } from 'react'
import { globalContext } from '@/context/globalContext';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Modal from '../modales/Modal';

const Formulario = ({ valueId = null }) => {
    const { consultarProducto, actualizarProducto, agregarProducto } = useContext(globalContext)

    const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm()

    const [producto, setProducto] = useState(null)

    useEffect(() => {
        if (producto) {
            setValue("title", producto.title);
            setValue("description", producto.description);
            setValue("price", producto.price);
            setValue("category", producto.category);
            setValue("image",producto.image)
        }
    }, [producto, setValue]);

    useEffect(() => {
        if (valueId) {
            const record = consultarProducto(valueId.params.id)

            if (record) {
                setProducto(record)
            }
        }
    }, [])

    const submit = handleSubmit((data) => {
        
        if (producto) {
            actualizarProducto(valueId.params.id, data)
        } else {
            agregarProducto(data)
        }
    })


    return (
        <>
            <div className='w-full flex justify-center items-cenetr'>
                {
                    <Card className="mt-24 w-96">
                        {
                            producto && <CardHeader color="blue-gray" className="">
                                <Image src={producto.image} width={500} height={500} alt={producto.category} className='w-full'></Image>
                            </CardHeader>
                        }

                        <CardBody className='flex flex-col gap-6'>
                            <form onSubmit={submit} className="mt-8 mb-2 max-w-screen-lg">
                                <div className="flex flex-col gap-3">

                                    <Input
                                        size="lg"
                                        label="Titulo"
                                        defaultValue={producto ? producto.title : ""}
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
                                        defaultValue={producto ? producto.description : ""}
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
                                        defaultValue={producto ? producto.price : ""}
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
                                                value: 999.99,
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
                                        <option value="" defaultValue={producto ? producto.category : ""}></option>
                                        <option value="men's clothing">men's clothing</option>
                                        <option value="women's clothing">women's clothing</option>
                                        <option value="electronics">electronics</option>
                                        <option value="jewelery">jewelery</option>
                                    </select>
                                    {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}

                                    <Input
                                        size="lg"
                                        label="Imagen"
                                        defaultValue={producto ? producto.image : ""}
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
                                    {producto ? "Actualizar" : "Crear Producto"}
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
