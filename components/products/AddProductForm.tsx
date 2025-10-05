"use client"

import { createProduct } from "@/actions/create-product-accion"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"



export default function AddProductForm({children} : {children: React.ReactNode}) {
    const router = useRouter()
    const handleSubmit = async (formData : FormData)=>{
        const data = {
            name : formData.get('name'),
            price : formData.get('price'),
            categoryId : formData.get('categoryId'),
            image: formData.get('image')
        }
        //validamos que los datos del shema de zod esten correctos
        const result = ProductSchema.safeParse(data)
        if(!result.success) {
            result.error.issues.forEach(issue =>{
                toast.error(issue.message)
            }) 
            return   
        }
       
        const response = await createProduct(result.data)
        if(response?.errors) {
            response?.errors.forEach(issue =>{
                toast.error(issue.message)
            })
            return
        }
        toast.success('Producto Creado Correctamente')
        router.push('/admin/products')
    }
  
  
    return (

    <>
        <div className="bg-white mt-10 px-5 py-10 rounded-sm shadow-md max-w-3xl mx-auto">
            <form action={handleSubmit} className="space-y-5">
                {/* usamos children para no renderizar un componente del servidor en uno del cliente */}
                {children}

                <input type="submit"
                className="bg-indigo-700 hover:bg-indigo-600 w-full text-white uppercase font-bold 
                mt-5 p-3 cursor-pointer"
                value={'Registrar Producto'} />

            </form>

        </div>
    </>

  )
}
