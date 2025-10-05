import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Insertando categorías...");
    const cats = await prisma.category.createMany({
      data: categories,
      skipDuplicates: true
    });
    console.log(`✅ Categorías insertadas: ${cats.count}`);

    console.log("🌱 Insertando productos...");
    const prods = await prisma.product.createMany({
      data: products,
      skipDuplicates: true
    });
    console.log(`✅ Productos insertados: ${prods.count}`);

    console.log("🎉 Seed completado con éxito!");
  } catch (error) {
    console.error("❌ Error en el seed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

