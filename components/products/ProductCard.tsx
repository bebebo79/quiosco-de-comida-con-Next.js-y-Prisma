import { Product } from "@/generated/prisma"
import { formatCurrency, getImagePathc } from "@/src/utils"
import Image from "next/image"
import AddProductButton from "./AddProductButton"


type ProductCardProps = {
    product : Product
}

export default function ProductCard({product} : ProductCardProps) {
  // la funcion de utils para incluir las imagenes de cloudinary con las de local
  const imagePath = getImagePathc(product.image)

  return (
    <div className="border bg-white">

        <Image
          src={imagePath}
          alt={`imagen plato ${product.name}`}
          height={500}
          width={400}
        />


        <div className="p-3">
          <h3 className="text-3xl font-bold">{product.name}</h3>
          <p className="text-4xl text-amber-500 mt-5 font-black">{formatCurrency(product.price)}</p>
          <AddProductButton
            product ={product}
          />
        </div>


    </div>
  )
}
