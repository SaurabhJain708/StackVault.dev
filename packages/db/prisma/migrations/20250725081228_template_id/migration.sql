-- AlterTable
ALTER TABLE "users" ADD COLUMN     "TemplateId" TEXT,
ADD COLUMN     "isProfileComplete" BOOLEAN NOT NULL DEFAULT false;
