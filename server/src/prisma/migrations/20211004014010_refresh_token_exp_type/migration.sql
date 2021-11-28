/*
  Warnings:

  - The `exp` column on the `refreshTokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "refreshTokens" DROP COLUMN "exp",
ADD COLUMN     "exp" INTEGER;
