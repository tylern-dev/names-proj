/*
  Warnings:

  - You are about to drop the `refreshTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "refreshTokens";

-- RenameIndex
ALTER INDEX "userProfile_userId_unique" RENAME TO "userProfile_userId_key";
