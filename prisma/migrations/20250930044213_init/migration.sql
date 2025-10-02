-- CreateEnum
CREATE TYPE "toparmon1"."product_condition_enum" AS ENUM ('new', 'used');

-- CreateEnum
CREATE TYPE "toparmon1"."user_professional_application_status_enum" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "toparmon1"."user_role_enum" AS ENUM ('user', 'admin', 'moderator', 'operator', 'superAdmin');

-- CreateEnum
CREATE TYPE "toparmon1"."user_status_enum" AS ENUM ('active', 'inactive', 'suspended');

-- CreateTable
CREATE TABLE "toparmon1"."product" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "condition" "toparmon1"."product_condition_enum" NOT NULL DEFAULT 'new',
    "is_negotiable" BOOLEAN NOT NULL DEFAULT false,
    "is_urgent" BOOLEAN NOT NULL DEFAULT false,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "has_delivery" BOOLEAN NOT NULL DEFAULT false,
    "category" VARCHAR(100),
    "subcategory" VARCHAR(100),
    "location" VARCHAR(200),
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "favorites_count" INTEGER NOT NULL DEFAULT 0,
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "calls_count" INTEGER NOT NULL DEFAULT 0,
    "contacts_count" INTEGER NOT NULL DEFAULT 0,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "is_promoted" BOOLEAN NOT NULL DEFAULT false,
    "promotion_start_date" TIMESTAMP(6),
    "promotion_end_date" TIMESTAMP(6),
    "promotion_type" VARCHAR(50),
    "promotion_price" DECIMAL(10,2),
    "promotion_duration_days" INTEGER,
    "has_large_photo" BOOLEAN NOT NULL DEFAULT false,
    "has_premium_badge" BOOLEAN NOT NULL DEFAULT false,
    "has_photo_gallery" BOOLEAN NOT NULL DEFAULT false,
    "has_direct_contacts" BOOLEAN NOT NULL DEFAULT false,
    "listing_id" VARCHAR(20),
    "slug" VARCHAR(255),
    "status" INTEGER NOT NULL DEFAULT 500,
    "tab" VARCHAR(50) NOT NULL DEFAULT 'draft',
    "should_expired_at" TIMESTAMP(6),
    "first_published_at" TIMESTAMP(6),
    "publishable" BOOLEAN NOT NULL DEFAULT false,
    "status_reason" VARCHAR(255),
    "rejected_reason" TEXT,
    "submitted_for_review_at" TIMESTAMP(6),
    "last_reviewed_at" TIMESTAMP(6),
    "reviewed_by_id" VARCHAR(36),
    "issues" TEXT,
    "web_uri" VARCHAR(255),
    "payload" TEXT,
    "promotion_data" TEXT,
    "statistics" TEXT,
    "notice_top" TEXT,
    "notice_bottom" TEXT,
    "delivery_enabled" BOOLEAN NOT NULL DEFAULT false,
    "gross_price" DECIMAL(10,2),
    "gross_price_discount" DECIMAL(10,2),
    "badges" TEXT,
    "promotion_history" TEXT,
    "total_promotion_spent" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "last_promotion_at" TIMESTAMP(6),
    "promotion_views_count" INTEGER NOT NULL DEFAULT 0,
    "promotion_likes_count" INTEGER NOT NULL DEFAULT 0,
    "promotion_calls_count" INTEGER NOT NULL DEFAULT 0,
    "promotion_contacts_count" INTEGER NOT NULL DEFAULT 0,
    "promotion_favorites_count" INTEGER NOT NULL DEFAULT 0,
    "engagement_history" TEXT,
    "shares_count" INTEGER NOT NULL DEFAULT 0,
    "comments_count" INTEGER NOT NULL DEFAULT 0,
    "reports_count" INTEGER NOT NULL DEFAULT 0,
    "daily_engagement_stats" TEXT,
    "weekly_engagement_stats" TEXT,
    "monthly_engagement_stats" TEXT,
    "created_by_id" VARCHAR NOT NULL,
    "createdById" UUID,
    "region_id" VARCHAR,
    "regionId" UUID,

    CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toparmon1"."product_image" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filename" VARCHAR NOT NULL,
    "original_name" VARCHAR NOT NULL,
    "mime_type" VARCHAR NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "rotation" INTEGER NOT NULL DEFAULT 0,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "product_id" VARCHAR NOT NULL,
    "productId" UUID,

    CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toparmon1"."region" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "regionId" INTEGER NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "whereTitle" VARCHAR(100) NOT NULL,
    "webUri" VARCHAR(100) NOT NULL,
    "isWholeCountry" BOOLEAN NOT NULL,
    "titlePath" TEXT NOT NULL,
    "parentId" UUID,
    "locationType" VARCHAR(20) NOT NULL,
    "locationCoordinates" TEXT NOT NULL,
    "webUriInfoUz" VARCHAR(100) NOT NULL,
    "webUriInfoRu" VARCHAR(100) NOT NULL,

    CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toparmon1"."telegram_session" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "sessionToken" VARCHAR NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "telegramId" VARCHAR,
    "name" VARCHAR,
    "phone" VARCHAR,
    "username" VARCHAR,
    "photo" VARCHAR,

    CONSTRAINT "PK_98529d9b393826ebf660d7e39f7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toparmon1"."user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20),
    "email" VARCHAR(100),
    "password" VARCHAR(255),
    "about" TEXT,
    "role" "toparmon1"."user_role_enum" NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "last_active" TIMESTAMP(6),
    "photo" VARCHAR(255),
    "banner_mobile" VARCHAR(255),
    "banner_desktop" VARCHAR(255),
    "logo" VARCHAR(255),
    "is_professional_seller" BOOLEAN NOT NULL DEFAULT false,
    "business_name" VARCHAR(100),
    "business_type" VARCHAR(50),
    "business_city" VARCHAR(100),
    "business_category" VARCHAR(100),
    "business_website" VARCHAR(255),
    "passport_file" VARCHAR(255),
    "business_certificate_file" VARCHAR(255),
    "professional_application_status" "toparmon1"."user_professional_application_status_enum",
    "application_notes" TEXT,
    "application_submitted_at" TIMESTAMP(6),
    "application_reviewed_at" TIMESTAMP(6),
    "application_reviewed_by_id" VARCHAR(36),
    "application_rejection_reason" TEXT,
    "total_ads" INTEGER NOT NULL DEFAULT 0,
    "subscribers_count" INTEGER NOT NULL DEFAULT 0,
    "ratings_count" INTEGER NOT NULL DEFAULT 0,
    "average_rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "total_shares" INTEGER NOT NULL DEFAULT 0,
    "total_comments" INTEGER NOT NULL DEFAULT 0,
    "total_reports" INTEGER NOT NULL DEFAULT 0,
    "chat_enabled" BOOLEAN NOT NULL DEFAULT true,
    "call_enabled" BOOLEAN NOT NULL DEFAULT true,
    "telegram_enabled" BOOLEAN NOT NULL DEFAULT false,
    "telegram_username" VARCHAR(50),
    "other_ads_enabled" BOOLEAN NOT NULL DEFAULT true,
    "b2c_business_page" BOOLEAN NOT NULL DEFAULT false,
    "is_online" BOOLEAN NOT NULL DEFAULT false,
    "last_seen" TIMESTAMP(6),
    "seller_type" VARCHAR(50),
    "telegram_id" VARCHAR(36),
    "status" "toparmon1"."user_status_enum" NOT NULL DEFAULT 'active',
    "social_network_account_type" VARCHAR(50),
    "social_network_id" VARCHAR(255),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "password_reset_token" VARCHAR(255),
    "password_reset_expires" TIMESTAMP(6),
    "refresh_token" TEXT,
    "refresh_token_expires" TIMESTAMP(6),
    "last_login_at" TIMESTAMP(6),
    "login_attempts" INTEGER NOT NULL DEFAULT 0,
    "locked_until" TIMESTAMP(6),
    "regionId" UUID,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IDX_1426083c3be21697125f2d8798" ON "toparmon1"."region"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_d3a879885392d6148028d367a16" ON "toparmon1"."telegram_session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_01eea41349b6c9275aec646eee" ON "toparmon1"."user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "toparmon1"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_c1ed111fba8a34b812d11f4235" ON "toparmon1"."user"("telegram_id");

-- AddForeignKey
ALTER TABLE "toparmon1"."product" ADD CONSTRAINT "FK_1f3a0d932854d0bf2088fd6833e" FOREIGN KEY ("regionId") REFERENCES "toparmon1"."region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toparmon1"."product" ADD CONSTRAINT "FK_806302f2d4da2a0c27eedbf34fe" FOREIGN KEY ("createdById") REFERENCES "toparmon1"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toparmon1"."product_image" ADD CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2" FOREIGN KEY ("productId") REFERENCES "toparmon1"."product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toparmon1"."region" ADD CONSTRAINT "FK_ed0c8098ce6809925a437f42aec" FOREIGN KEY ("parentId") REFERENCES "toparmon1"."region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "toparmon1"."user" ADD CONSTRAINT "FK_f1a2565b8f2580a146871cf1142" FOREIGN KEY ("regionId") REFERENCES "toparmon1"."region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
