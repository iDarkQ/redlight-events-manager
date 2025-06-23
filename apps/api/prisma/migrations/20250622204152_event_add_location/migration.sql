/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;
