/*
  Warnings:

  - You are about to alter the column `token` on the `RegisterTokens` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[token]` on the table `RegisterTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RegisterTokens" ALTER COLUMN "token" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "RegisterTokens_token_key" ON "RegisterTokens"("token");
