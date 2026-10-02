ALTER TABLE "products"
ADD COLUMN "pricing_type" TEXT;

UPDATE "products"
SET "pricing_type" = 'Free'
WHERE "pricing_type" IS NULL;

ALTER TABLE "products"
ALTER COLUMN "pricing_type" SET NOT NULL;