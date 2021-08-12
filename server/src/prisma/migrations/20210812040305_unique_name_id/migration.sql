/*
  Warnings:

  - A unique constraint covering the columns `[name,sex]` on the table `name` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "nameId" ON "name"("name", "sex");
