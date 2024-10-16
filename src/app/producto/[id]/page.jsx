import Formulario from "@/components/products/Formularios"
export const metadata = {
    title: "Producto",
    description: ""
}
const pageProduct = (value) => {

    return (
        <Formulario valueId={value}/>
    )
}

export default pageProduct
