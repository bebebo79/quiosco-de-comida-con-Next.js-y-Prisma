
"use client"

import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import useSWR from "swr";
import { OrderWitchProducts } from "@/src/types";



export default function OrdersPage() {

  // creamos la url donde esta la api
  const url = '/admin/orders/api'
  // consultamos la api
  const fetcher = ()=>fetch(url).then(res => res.json()).then(data=> data)
  // utilizamos el hook de SWR
  const {data, isLoading} = useSWR<OrderWitchProducts[]>(url, fetcher, {
    refreshInterval : 60000, //60 segundos
    revalidateOnFocus : false
  })
  if(isLoading) return 'Cargando....'

  if(data) return (
    <>
      <Heading>Administrar Ordenes</Heading>
    
      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {data.map(order => (
              <OrderCard
              key={order.id}
              order={order}/>
            ))}

        </div>
      ) : <p className="text-center">No hay Ordenes Pendientes</p>}

    </>
  )
}
