/*
  Warnings:

  - You are about to drop the column `refreshTokenHash` on the `refreshTokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "refreshTokens" DROP COLUMN "refreshTokenHash",
ADD COLUMN     "exp" TEXT,
ADD COLUMN     "jti" TEXT;
