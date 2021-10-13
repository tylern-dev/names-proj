-- CreateTable
CREATE TABLE "refreshTokens" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,

    CONSTRAINT "refreshTokens_pkey" PRIMARY KEY ("id")
);

-- RenameIndex
ALTER INDEX "name.cursorId_unique" RENAME TO "name_cursorId_key";

-- RenameIndex
ALTER INDEX "nameId" RENAME TO "name_name_sex_key";

-- RenameIndex
ALTER INDEX "namesYear.year_unique" RENAME TO "namesYear_year_key";

-- RenameIndex
ALTER INDEX "user.email_unique" RENAME TO "user_email_key";
