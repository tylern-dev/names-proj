/*
  Warnings:

  - You are about to drop the `authentication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "authentication" DROP CONSTRAINT "authentication_userId_fkey";

-- DropTable
DROP TABLE "authentication";
