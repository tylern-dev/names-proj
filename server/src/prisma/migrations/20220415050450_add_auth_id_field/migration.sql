/*
  Warnings:

  - Added the required column `authId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "authId" TEXT NOT NULL;
