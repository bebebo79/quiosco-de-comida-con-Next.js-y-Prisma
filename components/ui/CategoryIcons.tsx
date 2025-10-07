"use client"
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"


type CategoryIconsProps = {
    category : Category
}

export default function CategoryIcons({category}: CategoryIconsProps) {
    // para destacar la categoria seleccionada en la url
    const params  = useParams<{category :string}>()
    const selectedCatgory = params.category
    
   

  return (
    <div
        className={`flex items-center gap-4 w-full border-t border-gray-200 p-3
        last-of-type:border-b ${category.slug === selectedCatgory ? 'bg-amber-300' : '' }`}
    >
        <div className="relative w-16 h-16 ">
            <Image 
                src={`/icon_${category.slug}.svg`} 
                alt="imagen categoria"
                fill
            
            />
        </div>
        <Link className="tex-xl font-bold"
            href={`/order/${category.slug}`}>
            {category.name}
        </Link>
    </div>
  )
}
