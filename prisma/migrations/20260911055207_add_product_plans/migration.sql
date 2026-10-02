-- CreateTable
CREATE TABLE "product_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "plan_name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_plans_product_id_idx" ON "product_plans"("product_id");

-- AddForeignKey
ALTER TABLE "product_plans" ADD CONSTRAINT "product_plans_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
