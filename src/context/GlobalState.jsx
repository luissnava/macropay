"use client";
import React, { useMemo, useState, useEffect } from 'react'
import { globalContext } from './globalContext'
import { items } from '@/server/database'
const GlobalState = ({ children }) => {

    const [open, setOpen] = useState(false)
    const [idProduct, setIdProduct] = useState(0)
    const [productos, setProductos] = useState();


    useEffect(() => {
        // Ordenar los productos de manera descendente por id
        const productosOrdenados = productos?.sort((item1, item2) => item2.id - item1.id);
        localStorage.setItem("productos", JSON.stringify(productos))

    }, [productos])


    const handleOpen = (id) => {
        setOpen(!open)
        setIdProduct(id)
    }

    const consultarProducto = (id) => {

        const productoSelected = productos.find(item => item.id == id)
        if (productoSelected) {
            return productoSelected
        }

    }

    const agregarProducto = (nuevo) => {
        const nuevoId = productos.length + 1
        const nuevoProducto = { ...nuevo, id: nuevoId };
        setProductos(prevProductos => [...prevProductos, nuevoProducto])
        setOpen(!open)

    }

    const actualizarProducto = (id, nuevosDatos) => {
        const productosActualizados = productos.map(item =>
            item.id == id ? { ...item, ...nuevosDatos } : item
        );
        setProductos(productosActualizados)
        setOpen(!open)
    }

    const eliminarProducto = (id) => {
        const productosActualizados = productos.filter(item => item.id !== id)
        setProductos(productosActualizados)
        setOpen(!open)
    }

    const valueProvider = useMemo(() => ({
        open,
        productos,
        idProduct,
        handleOpen,
        consultarProducto,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
    }))

    return (
        <globalContext.Provider value={valueProvider}>
            {children}
        </globalContext.Provider>
    )
}

export default GlobalState
