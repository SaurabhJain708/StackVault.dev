-- AlterTable
ALTER TABLE "users" ADD COLUMN     "TokensAllowed" INTEGER DEFAULT 2000,
ADD COLUMN     "TokensUsed" INTEGER DEFAULT 0;
