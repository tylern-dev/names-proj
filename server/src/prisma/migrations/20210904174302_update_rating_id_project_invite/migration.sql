/*
  Warnings:

  - The primary key for the `projectInvite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `projectInvite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `rating` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `email` to the `projectInvite` table without a default value. This is not possible if the table is not empty.
  - The required column `inviteCode` was added to the `projectInvite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `inviteId` to the `projectInvite` table without a default value. This is not possible if the table is not empty.
  - Made the column `babyNameId` on table `rating` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projectInvite" DROP CONSTRAINT "projectInvite_pkey",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "inviteCode" TEXT NOT NULL,
ADD COLUMN     "inviteId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rating" DROP CONSTRAINT "rating_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "babyNameId" SET NOT NULL,
ADD PRIMARY KEY ("id");
