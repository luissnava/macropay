"use client"
import { globalContext } from "@/context/globalContext";
import { useContext } from "react";
import CardProduct from '../cards/Card';
import Modal from '../modales/Modal';
import HeaderPanel from '../header/Header';
const PanelProductos = () => {
  const {productos} = useContext(globalContext)
  return (
    <div className="container mx-auto p-4">
     <HeaderPanel/>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {
          productos?.map((item, index) => (
           <CardProduct key={index} item={item}/>
          ))
        }


      </div>

      <Modal eliminar={true}/>
    </div>
  )
}

export default PanelProductos
