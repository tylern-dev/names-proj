/*
  Warnings:

  - Added the required column `updatedAt` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "authentication" DROP CONSTRAINT "authentication_userId_fkey";

-- DropForeignKey
ALTER TABLE "popularity" DROP CONSTRAINT "popularity_nameId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "projectBabyName" DROP CONSTRAINT "projectBabyName_nameId_fkey";

-- DropForeignKey
ALTER TABLE "projectInvite" DROP CONSTRAINT "projectInvite_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projectInvite" DROP CONSTRAINT "projectInvite_userId_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_babyNameId_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "userProfile" DROP CONSTRAINT "userProfile_userId_fkey";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "popularity" ADD FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authentication" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userProfile" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectBabyName" ADD FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD FOREIGN KEY ("babyNameId") REFERENCES "projectBabyName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectInvite" ADD FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectInvite" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
