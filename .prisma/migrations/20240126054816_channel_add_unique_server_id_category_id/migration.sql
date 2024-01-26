/*
  Warnings:

  - A unique constraint covering the columns `[serverId,categoryId]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Channel_serverId_categoryId_key" ON "Channel"("serverId", "categoryId");
