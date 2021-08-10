/*
  Warnings:

  - Added the required column `popularity` to the `Popularity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Popularity" ADD COLUMN     "popularity" INTEGER NOT NULL;
