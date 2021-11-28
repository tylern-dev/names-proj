-- AlterTable
ALTER TABLE "refreshTokens" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "refreshTokenHash" DROP NOT NULL;
