"use client";
import React, { useMemo, useState, useEffect } from 'react'
import { globalContext } from './globalContext'
import { items } from '@/server/database'
const GlobalState = ({ children }) => {

    const [open, setOpen] = useState(false)
    const [idProduct, setIdProduct] = useState(0)
    const [productos, setProductos] = useState();

    const getInitialProductos = () => {
        const productosGuardados = localStorage.getItem("productos");
       
        // Solo establecer productos desde localStorage si no está vacío
        if (productosGuardados && productosGuardados !== "undefined") {
            setProductos(JSON.parse(productosGuardados));
        } else {
            
            setProductos(items);
        }
    };

    useEffect(() => {
        getInitialProductos()

    }, []);
    useEffect(() => {
        // Ordenar los productos de manera descendente por id
        const productosOrdenados = productos?.sort((item1, item2) => item2.id - item1.id);
        localStorage.setItem("productos", JSON.stringify(productosOrdenados))

    }, [productos])


    const handleOpen = (id) => {
        setOpen(!open)
        setIdProduct(id)
    }
    

    const consultarProducto = (id) => {
        const data = localStorage.getItem("productos")
        const datos = JSON.parse(data)
        
        const productoSelected = datos?.find(item => item.id == id)
        if (productoSelected) {
            return productoSelected
        }

    }

    const agregarProducto = (nuevo) => {
        const nuevoId = productos?.length + 1
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
