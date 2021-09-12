/*
  Warnings:

  - You are about to drop the column `inviteId` on the `projectInvite` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `projectBabyName` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `projectInvite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projectBabyName" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "projectInvite" DROP COLUMN "inviteId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "rating" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
