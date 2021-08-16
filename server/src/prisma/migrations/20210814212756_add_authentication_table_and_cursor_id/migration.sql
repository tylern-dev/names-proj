/*
  Warnings:

  - A unique constraint covering the columns `[cursorId]` on the table `name` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "name" ADD COLUMN     "cursorId" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "acceptTermsAndConditions" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "name.cursorId_unique" ON "name"("cursorId");
