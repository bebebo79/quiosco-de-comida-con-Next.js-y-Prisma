'use client'
import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
    product : Product
}

export default function AddProductButton({product} : AddProductButtonProps) {
  const addToOrder = useStore((state)=> state.addToOrder)

  return (
    <div>
        <button 
            type="button"
            className="bg-indigo-500 hover:bg-indigo-800 font-bold text-white uppercase mt-5 p-3 w-full cursor-pointer"
            onClick={()=>addToOrder(product)}
            >
            Agregar  
          </button>
    </div>
  )
}
