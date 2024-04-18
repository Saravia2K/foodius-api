-- CreateEnum
CREATE TYPE "ORDER_STATES" AS ENUM ('ACTIVE', 'PREPARING', 'FINISHED', 'DELIVERING', 'DELIVERED', 'CANCELED');

-- CreateEnum
CREATE TYPE "DELIVERY_METHODS" AS ENUM ('UPON_DELIVERY', 'HOME_DELIVERY');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "names" VARCHAR(255) NOT NULL,
    "last_names" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(8) NOT NULL,
    "location" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Businesses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(8) NOT NULL,
    "location" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "Businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedules" (
    "id" SERIAL NOT NULL,
    "id_business" INTEGER NOT NULL,
    "day" VARCHAR(50) NOT NULL,
    "from" TIMESTAMP NOT NULL,
    "to" TIMESTAMP NOT NULL,

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodCategories" (
    "id" SERIAL NOT NULL,
    "id_business" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "FoodCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foods" (
    "id" SERIAL NOT NULL,
    "id_food_category" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "extra_fee" DECIMAL(10,2) NOT NULL,
    "img_url" VARCHAR(500) NOT NULL,
    "is_available" BOOLEAN NOT NULL,

    CONSTRAINT "Foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "state" "ORDER_STATES" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "delivery_method" "DELIVERY_METHODS" NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdersDetails" (
    "id" SERIAL NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_food" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrdersDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_number_key" ON "Users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Businesses_email_key" ON "Businesses"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Businesses_phone_number_key" ON "Businesses"("phone_number");

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_id_business_fkey" FOREIGN KEY ("id_business") REFERENCES "Businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodCategories" ADD CONSTRAINT "FoodCategories_id_business_fkey" FOREIGN KEY ("id_business") REFERENCES "Businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foods" ADD CONSTRAINT "Foods_id_food_category_fkey" FOREIGN KEY ("id_food_category") REFERENCES "FoodCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDetails" ADD CONSTRAINT "OrdersDetails_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDetails" ADD CONSTRAINT "OrdersDetails_id_food_fkey" FOREIGN KEY ("id_food") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
