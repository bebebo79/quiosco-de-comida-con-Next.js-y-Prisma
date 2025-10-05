import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

//creamos la funcion para ver si el termino coincide con el producto
async function searchProducts(searchTerm : string) {
    const products = await prisma.product.findMany({
        where : {
            name : {
                contains : searchTerm,
                mode: 'insensitive' // para no diferenciar mayusculas
            }
        },
        include : {
            category : true
        }
    })
    return products
}

export default async function SearchPage({searchParams} : {searchParams:Promise<{search:string}>}) {
    const products = await searchProducts((await searchParams).search)

    return(
        <>
            <Heading>Resultado de Búsqueda:  <span className="text-indigo-600 ">{(await searchParams).search}</span></Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                    
                <ProductSearchForm/>
            </div>

            {products.length !== 0 ? (
                <ProductTable
                products={products}
                />
            ): (
                <p className="text-center text-lg">No se ha encontrado ningun Producto</p>
            )}
           
        
        </>
    )
}