/*
  Warnings:

  - You are about to drop the `product_plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_plans" DROP CONSTRAINT "product_plans_product_id_fkey";

-- DropTable
DROP TABLE "product_plans";
