/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "token" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_token_key" ON "Orders"("token");
