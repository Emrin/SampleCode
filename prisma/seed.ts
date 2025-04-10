/*
 * Seeds DB.
 * */
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // todo populate db with example values
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
