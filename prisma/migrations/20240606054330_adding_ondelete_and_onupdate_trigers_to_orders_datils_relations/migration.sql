-- DropForeignKey
ALTER TABLE "OrdersDetails" DROP CONSTRAINT "OrdersDetails_id_food_fkey";

-- DropForeignKey
ALTER TABLE "OrdersDetails" DROP CONSTRAINT "OrdersDetails_id_order_fkey";

-- AddForeignKey
ALTER TABLE "OrdersDetails" ADD CONSTRAINT "OrdersDetails_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDetails" ADD CONSTRAINT "OrdersDetails_id_food_fkey" FOREIGN KEY ("id_food") REFERENCES "Foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;
