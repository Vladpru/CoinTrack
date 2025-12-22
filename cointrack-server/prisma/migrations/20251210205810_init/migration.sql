/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `transaction_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `transaction_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- DropIndex
DROP INDEX "public"."transaction_categories_name_key";

-- AlterTable
ALTER TABLE "public"."transaction_categories" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."transactions" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "public"."TransactionType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "transaction_categories_name_user_id_key" ON "public"."transaction_categories"("name", "user_id");

-- AddForeignKey
ALTER TABLE "public"."transaction_categories" ADD CONSTRAINT "transaction_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
