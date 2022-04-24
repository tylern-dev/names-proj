/*
  Warnings:

  - You are about to drop the column `cursorId` on the `name` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "name_cursorId_key";

-- AlterTable
ALTER TABLE "name" DROP COLUMN "cursorId";
