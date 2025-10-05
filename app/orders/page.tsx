"use client"
import LatestOrdersItems from "@/components/order/LatestOrdersItems";
import Logo from "@/components/ui/Logo";
import { OrderWitchProducts } from "@/src/types";
import useSWR from "swr";


export default function OrdersPage() {
  // les decimos en que url estan los datos de la api
  const url = '/orders/api'
  //consultamos la api
  const fetcher = ()=>fetch(url).then(res=>res.json()).then(data=>data)
  // usamos SWR para traer los datos
  const { data, isLoading } = useSWR<OrderWitchProducts[]>(url, fetcher, {
    refreshInterval : 60000,
    revalidateOnFocus : false
  })  
  if(isLoading) return 'Cargando...'


  if(data) return (
    <>
        <h1 className="text-center text-6xl text-black mt-8 font-bold">Ordenes Listas</h1>
        <Logo/>

        {data.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
              {data.map(order=>(
                <LatestOrdersItems
                key={order.id}
                order={order}/>
              ))}
          </div>

        ) : <p className="text-center my-10">No hay Ordenes</p> }

    </>
  )
}
