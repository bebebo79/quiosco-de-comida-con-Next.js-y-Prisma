"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"

export async function updateProduct(data : unknown, id : number) {
    const result = ProductSchema.safeParse(data)
        // validacion del servidor
       if(!result.success){
           return {
               errors: result.error.issues
           }
       } 
       //actualizamos
       await prisma.product.update({
            where:{
                id
            },
           data : result.data
       })
}