-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Name" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Popularity" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "nameId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Popularity" ADD FOREIGN KEY ("nameId") REFERENCES "Name"("id") ON DELETE CASCADE ON UPDATE CASCADE;
