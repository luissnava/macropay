
import Formulario from "@/components/products/Formularios"

export const metadata = {
    title: "Crear un Producto",
    description: "Crear un Producto"
}
const pageProduct = (value) => {

    return (
        <>
            <Formulario valueId={value} />
        </>
    )
}

export default pageProduct
