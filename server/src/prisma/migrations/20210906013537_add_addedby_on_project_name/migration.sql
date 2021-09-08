/*
  Warnings:

  - You are about to drop the column `babyDOB` on the `userProfile` table. All the data in the column will be lost.
  - Added the required column `userId` to the `projectBabyName` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "babyDOB" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "projectBabyName" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userProfile" DROP COLUMN "babyDOB";

-- AddForeignKey
ALTER TABLE "projectBabyName" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
