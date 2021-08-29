/*
  Warnings:

  - You are about to drop the `babyName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "babyName" DROP CONSTRAINT "babyName_projectId_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_babyNameId_fkey";

-- DropTable
DROP TABLE "babyName";

-- CreateTable
CREATE TABLE "projectBabyName" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projectBabyName" ADD FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectBabyName" ADD FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD FOREIGN KEY ("babyNameId") REFERENCES "projectBabyName"("id") ON DELETE SET NULL ON UPDATE CASCADE;
