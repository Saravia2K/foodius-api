/*
  Warnings:

  - Added the required column `banner` to the `Businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Businesses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Businesses" ADD COLUMN     "banner" VARCHAR(255) NOT NULL,
ADD COLUMN     "logo" VARCHAR(255) NOT NULL;
