"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


type AdminRouterProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
}
}

export default function AdminRouter({link} : AdminRouterProps) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(link.url)

  return (
    <Link
    href={link.url}
    className={`${isActive ? 'bg-amber-400 ' : ''}  font-bold border-t border-gray-200 p-3 text-lg last-of-type:border-b`}
    target={link.blank ? '_blank' : '' }>
        {link.text}
        
    </Link>
  )
}
