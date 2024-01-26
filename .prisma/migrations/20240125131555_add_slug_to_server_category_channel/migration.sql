/*
  Warnings:

  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "slug" TEXT NOT NULL;
