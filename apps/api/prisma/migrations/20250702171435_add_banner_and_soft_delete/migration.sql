/*
  Warnings:

  - Added the required column `deleted` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "deleted" BOOLEAN NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3);
