-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "unread" BOOLEAN,
ALTER COLUMN "description" DROP NOT NULL;
