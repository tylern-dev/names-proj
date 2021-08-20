/*
  Warnings:

  - You are about to drop the column `limit` on the `babyName` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "babyName" DROP COLUMN "limit";

-- AddForeignKey
ALTER TABLE "rating" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
