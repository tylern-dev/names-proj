/*
  Warnings:

  - You are about to drop the `nameYear` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "nameYear";

-- CreateTable
CREATE TABLE "namesYear" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "namesYear.year_unique" ON "namesYear"("year");
