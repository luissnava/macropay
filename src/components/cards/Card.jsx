import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.css'
import { globalContext } from '@/context/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
    Card,
    CardBody,
    CardHeader,
    Typography
} from "@material-tailwind/react";


const CardProduct = ({ item }) => {

    const { handleOpen } = useContext(globalContext)
    return (

        <Card className="hover:scale-105 transition-all duration-500 flex flex-col">
            <div className="flex justify-end p-2 cursor-pointer gap-4">
                <Link href={`/producto/${item.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} className="text-blue-gray-400 hover:text-blue-gray-900" />
                </Link>
                <FontAwesomeIcon icon={faTrash} onClick={() => handleOpen(item.id)} className=" h-4 w-4 text-blue-gray-400 hover:text-blue-gray-900" />
            </div>
            <div className="flex justify-end px-2 cursor-pointer">

            </div>
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-row items-center justify-start pb-2"
            >
                <Image src={item.image} width={100} height={100} alt={item.category}></Image>
                <Typography variant="small" color="blue-gray" className="font-medium ml-4">
                    {item.title}
                </Typography>

            </CardHeader>

            <CardBody className="mt-auto ">
                <Typography variant="h4" color="blue-gray" className="font-bold overflow-hidden" >
                    $ {item.price}
                </Typography>
                <Typography variant="small" color="gray" className={`text-sm ${styles.texto}`} >
                    {item.description}
                </Typography>
            </CardBody>

        </Card>

    )
}

export default CardProduct
