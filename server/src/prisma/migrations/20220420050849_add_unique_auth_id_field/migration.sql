/*
  Warnings:

  - A unique constraint covering the columns `[authId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_authId_key" ON "user"("authId");
