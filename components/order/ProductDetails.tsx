import { OrderItem } from "@/src/types";
import React from "react";
import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/store";

type ProductDetailsProps = {
  item: OrderItem;
};

export default function ProductDetails({ item }: ProductDetailsProps) {
  
    const incremeteQuantity = useStore((state)=> state.increaseQuantity)
    const decreseQuantity = useStore((state)=> state.decreseQuantity)
    const removeItem = useStore((state)=> state.removeItem)




  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8 cursor-pointer" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">{formatCurrency(item.price)}</p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button type="button" onClick={() => decreseQuantity(item.id)}>
            <MinusIcon className="h-6 w-6 cursor-pointer" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button type="button" onClick={() => incremeteQuantity(item.id)}>
            <PlusIcon className="h-6 w-6 cursor-pointer" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
        
      </div>
      
    </div>
  );
}
