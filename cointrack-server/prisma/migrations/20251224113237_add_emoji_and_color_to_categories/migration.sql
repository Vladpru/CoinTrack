/*
  Warnings:

  - You are about to drop the column `description` on the `categories` table. All the data in the column will be lost.
  - Added the required column `color` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoji` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "description",
ADD COLUMN     "color" VARCHAR(255) NOT NULL,
ADD COLUMN     "emoji" VARCHAR(255) NOT NULL;
