-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product_tags" (
    "product_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "product_tags_pkey" PRIMARY KEY ("product_id","tag_id")
);

-- CreateTable
CREATE TABLE "public"."product_tech_stacks" (
    "product_id" UUID NOT NULL,
    "stack_id" UUID NOT NULL,

    CONSTRAINT "product_tech_stacks_pkey" PRIMARY KEY ("product_id","stack_id")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT,
    "pricing" TEXT,
    "thumbnail_url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "upvotes_count" INTEGER NOT NULL DEFAULT 0,
    "comments_count" INTEGER NOT NULL DEFAULT 0,
    "view_count" BIGINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."screenshots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "screenshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tech_stacks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tech_stacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."upvotes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "upvotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar_url" TEXT,
    "bio" TEXT,
    "github_url" TEXT,
    "x_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "website_url" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "public"."categories"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "public"."products"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "public"."tags"("name" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "public"."tags"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "tech_stacks_name_key" ON "public"."tech_stacks"("name" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "tech_stacks_slug_key" ON "public"."tech_stacks"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "upvotes_user_product_unique" ON "public"."upvotes"("user_id" ASC, "product_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username" ASC);

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."product_tags" ADD CONSTRAINT "product_tags_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."product_tags" ADD CONSTRAINT "product_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."product_tech_stacks" ADD CONSTRAINT "product_tech_stacks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."product_tech_stacks" ADD CONSTRAINT "product_tech_stacks_stack_id_fkey" FOREIGN KEY ("stack_id") REFERENCES "public"."tech_stacks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."screenshots" ADD CONSTRAINT "screenshots_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."upvotes" ADD CONSTRAINT "upvotes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."upvotes" ADD CONSTRAINT "upvotes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
