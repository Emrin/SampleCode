-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('Carnivore', 'Herbivore', 'Omnivore');

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "dietType" "DietType" NOT NULL DEFAULT 'Carnivore';
