-- CreateEnum
CREATE TYPE "ExtinctionStatus" AS ENUM ('Extinct', 'Deextincting', 'NotExtinct');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" VARCHAR(2) NOT NULL DEFAULT 'en';

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "extinctionStatus" "ExtinctionStatus" NOT NULL,
    "extinctionDateText" VARCHAR(1000) NOT NULL,
    "extinctionYear" INTEGER NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "habitat" VARCHAR(1000) NOT NULL,
    "diet" VARCHAR(1000) NOT NULL,
    "uniqueTraits" VARCHAR(1000) NOT NULL,
    "funFacts" VARCHAR(1000) NOT NULL,
    "image" VARCHAR(1000) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Animal_name_key" ON "Animal"("name");
