"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"



export default function OrderSummary() {
  const order = useStore((state)=>state.order)
  const clearOrder = useStore((state)=> state.clearOrder)
  const total = useMemo(()=> order.reduce((total, item)=> total + (item.quantity * item.price), 0) ,[order])
  const handleCreateOrder = async (formData : FormData)=> {
    const data = {
      name : formData.get('name'),
      total,
      order
    }
    // validacion del cliente
    const result = OrderSchema.safeParse(data)
    if(!result.success){
      result.error.issues.forEach((issues)=>{
        toast.error(issues.message)
      })
      return
    }
    // si la validacion del servidor esta ok
    const response = await createOrder(data)
    if(response?.error){
      response.error.forEach((issues)=> {toast.error(issues.message)})
    }
    // si ha pasado el try catch y se ha guardado en la base datos
    toast.success('Has Realizado el Pedido')
    clearOrder()
  }

  return (

    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-6">
        <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
        {order.length === 0 ? <p className="text-center my-10">El Carrito esta vacio</p> : (
          <div className="mt-5">
              {order.map(item =>(
                <ProductDetails
                key={item.id}
                item={item}/>
              ))}
              <p className="text-2xl mt-20 text-center">
                Total a pagar {' '}
                <span className="font-bold">{formatCurrency(total)}</span>
              </p>
              <form className="mt-10 py-2 space-y-5"
                    action={handleCreateOrder}>
                <input type="text"
                placeholder="Pon tu nombre" 
                className="bg-white border border-gray-100 p-2 w-full"
                name="name"
                
                
                />        
                <input type="submit"
                className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold" 
                value= 'Confirmar Pedido'  
                
                />


              </form>
          </div>
        ) }
    </aside>
  )
}
