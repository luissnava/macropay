"use client";
import React, { useMemo, useState, useEffect } from 'react'
import { globalContext } from './globalContext'
import { items } from '@/server/database'
const GlobalState = ({ children }) => {

    const [open, setOpen] = useState(false)
    const [idProduct, setIdProduct] = useState(0)
    const [productos, setProductos] = useState();


    const getInitialProductos = () => {
        console.log("Se comparara el local storgae cuando se inicia la pagina o se recarga la pagina");

        const productosGuardados = localStorage.getItem("productos");

        // Solo establecer productos desde localStorage si no está vacío
        if (productosGuardados && productosGuardados !== "undefined") {
            console.log("Se establecen datos del local storage en el estado Productos ya que localstrorage ya tiene datos");
            setProductos(JSON.parse(productosGuardados));
        } else {

            console.log("No se encuntran datos en el local y se establece items como valor de Productos");
            // Ordenar los productos de manera descendente por id
            const productosOrdenados = items.sort((item1, item2) => item2.id - item1.id);
            setProductos(productosOrdenados)
            localStorage.setItem("productos", JSON.stringify(productosOrdenados))

        }
    };

    const getLocal = () => {
        const datos = localStorage.getItem("productos");

        const datosParse = JSON.parse(datos)

        return datosParse
    }



    const handleOpen = (id) => {
        setOpen(!open)
        setIdProduct(id)
    }

    const consultarProducto = (id) => {

        const datos = getLocal()

        if (datos) {
            const productoSelected = datos.find(item => item.id == id)

            if (productoSelected) {
                return productoSelected
            }
        }

    }

    const agregarProducto = (nuevo) => {
        const datos = getLocal()
        if (datos) {
            const nuevoId = datos.length + 1
            const nuevoProducto = { ...nuevo, id: nuevoId };
            setProductos(prevProductos => [...prevProductos, nuevoProducto])
            setOpen(!open)
        }


    }

    const actualizarProducto = (id, nuevosDatos) => {
        const datos = getLocal()
        if (datos) {
            const productosActualizados = datos.map(item =>
                item.id == id ? { ...item, ...nuevosDatos } : item
            );
            setProductos(productosActualizados)
            setOpen(!open)
        }

    }

    const eliminarProducto = (id) => {
        const datos = getLocal()

        if (datos) {
            const productosActualizados = datos.filter(item => item.id !== id)
            setProductos(productosActualizados)
            setOpen(!open)
        }


    }

    const valueProvider = useMemo(() => ({
        open,
        productos,
        idProduct,
        getInitialProductos,
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
