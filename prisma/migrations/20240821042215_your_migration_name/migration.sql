/*
  Warnings:

  - You are about to drop the column `notes` on the `Books` table. All the data in the column will be lost.
  - Made the column `author` on table `Books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genre` on table `Books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Books" DROP COLUMN "notes",
ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "genre" SET NOT NULL;
