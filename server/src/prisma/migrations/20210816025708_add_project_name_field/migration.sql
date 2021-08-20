/*
  Warnings:

  - Added the required column `projectName` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "projectName" TEXT NOT NULL;
