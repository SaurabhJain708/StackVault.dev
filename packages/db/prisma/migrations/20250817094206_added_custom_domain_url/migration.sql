/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_url_key" ON "users"("url");
