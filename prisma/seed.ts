/*
 * Seeds DB.
 * */
import { PrismaClient } from "@prisma/client"
import animals from "./data/animals"

const prisma = new PrismaClient()

async function main() {
  const currentAnimals = await prisma.animal.count()
  console.log(`Found ${currentAnimals} recorded animals.`)
  if (!currentAnimals) {
    console.log("Adding animals...")
    const newAnimals = await prisma.animal.createMany({
      data: animals,
      skipDuplicates: true,
    })
    console.log(`Added ${animals.length} animals to the record.`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    if (e instanceof Error) console.error(e?.message)
    else console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
