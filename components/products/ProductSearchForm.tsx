"use client"
import { SearchSchema } from '@/src/schema'
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


export default function ProductSearchForm() {
  const router= useRouter()
  // creamos la accion
  const handleSeachForm = (formData : FormData)=>{
    const data = {
        search : formData.get('search')
    }
    const result = SearchSchema.safeParse(data)
    // mandamos el mensaje de validacion con toast
    if(!result.success){
      result.error.issues.forEach(issue =>{
        toast.error(issue.message)
      })
      return
    }
    router.push(`/admin/products/search?search=${result.data.search}`)
  }



  return (
    <form className='flex item-center' action={handleSeachForm}>
        
        <input type="text"
               placeholder='Buscar Producto'
               name='search'
               className='p-2 bg-white placeholder:text-gray-400 w-full'  
        />
        <input type="submit"
               value={'Buscar'}
               className='bg-indigo-700 text-white uppercase p-2 cursor-pointer' 
        />


    </form>
  )
}
