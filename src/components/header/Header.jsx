import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button
} from "@material-tailwind/react";
const HeaderPanel = () => {
    const router = useRouter()
    const handleCreate = () => {
        router.push("/crear-producto")
    }
    return (
        <div>
            <Card>
                <CardHeader
                    floated={false}
                    shadow={false}
                    // color="transparent"
                    className="w-full text-center"
                >
                    <Typography as={"h3"} variant="h3" color="blue-gray" className="-ml-10">
                        Productos
                    </Typography>
                </CardHeader>
                <CardBody className="w-full flex justify-center ">
                    <Button className="flex items-center gap-2" onClick={handleCreate}>
                        <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                        Nuevo Producto
                    </Button>

                </CardBody>
            </Card>
        </div>
    )
}

export default HeaderPanel
