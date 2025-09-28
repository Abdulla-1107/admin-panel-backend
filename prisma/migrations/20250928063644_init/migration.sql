-- CreateEnum
CREATE TYPE "toparmon"."Role" AS ENUM ('USER', 'CUSTOMER', 'SELLER', 'ADMIN');

-- CreateTable
CREATE TABLE "toparmon"."User" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "toparmon"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toparmon"."Customer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "regionId" TEXT,
    "address" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toparmon"."Seller" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "regionId" TEXT,
    "shopName" TEXT NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toparmon"."Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "toparmon"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "toparmon"."Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_userId_key" ON "toparmon"."Seller"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "toparmon"."Region"("name");

-- AddForeignKey
ALTER TABLE "toparmon"."Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "toparmon"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toparmon"."Customer" ADD CONSTRAINT "Customer_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "toparmon"."Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toparmon"."Seller" ADD CONSTRAINT "Seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "toparmon"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toparmon"."Seller" ADD CONSTRAINT "Seller_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "toparmon"."Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
