
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";


async function productCount() {
    return await prisma.product.count()
}

async function getProduct(page:number, pageSize:number) {
    const skip = (page - 1) * pageSize
    const products = await prisma.product.findMany({
        take : pageSize ,
        skip,
        include : {
            category : true
        }
    })
    return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProduct>>


export default async function ProductPage({searchParams}: {searchParams:Promise<{page:string}>}) {
  const page =  +(await searchParams).page || 1
  const pageSize = 10

 // para redireccionar a la pag.0 si se pone -20
  if(page < 0) redirect('/admin/products')


  //cuando tenemos dos fuciones que no tienen que ver para ejecutarse
  // se puede poner las dos a la vez independientes
  const productsData =  getProduct(page, pageSize)
  const totalProductsData =  productCount()
  const [products, totalProduct] = await Promise.all([productsData, totalProductsData])
  
 

  // para poner el total de paginas a utilizar
  const totalPages = Math.ceil(totalProduct / pageSize)

  // para redireccionar si alguien quiere ver mas paginas del total 
  if(totalPages < page ) {
    redirect('/admin/products')
  }
 

 
  return(
    <>
      <Heading>Administrar Productos</Heading>
      
      <div className="flex flex-col lg:flex-row lg:justify-between   gap-5">
        <Link
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-2xl px-10 py-3 text-center
                    font-bold cursor-pointer"   
        >Crear Producto</Link>
        <ProductSearchForm/>
      </div>
      
      <ProductTable
        products={products}
      />
      
      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    
    
    </>
  )

}