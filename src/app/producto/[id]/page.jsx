
import Formulario from "@/components/products/Formularios"

export const metadata = {
    title: "Editar un producto",
    description: "Editar un producto"
}
const pageProduct = (value) => {

    return (
        <>
            <Formulario valueId={value} />
        </>
    )
}

export default pageProduct
