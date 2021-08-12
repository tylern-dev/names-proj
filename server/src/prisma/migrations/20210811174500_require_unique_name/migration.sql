/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `name` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "name.name_unique" ON "name"("name");
