import {prisma} from '../../src/lib/prisma'
import CategoryIcons from '../ui/CategoryIcons'
import Logo from '../ui/Logo'


async function getCategories() {
  return await prisma.category.findMany()
  
}

export default async function OrderSidebar() {
  
  const categories = await getCategories()

  return (
    
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo/>
       <nav className='mt-10'>
          {categories.map(category =>(
            <CategoryIcons key={category.id} category={category}/>
          ))}
       </nav>

    </aside>
  )
}
