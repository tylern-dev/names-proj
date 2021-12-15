-- CreateTable
CREATE TABLE "userAddedName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sex" "sex",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "userAddedName_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userAddedName" ADD CONSTRAINT "userAddedName_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
