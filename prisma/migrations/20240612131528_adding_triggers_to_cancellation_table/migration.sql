-- DropForeignKey
ALTER TABLE "Cancellation" DROP CONSTRAINT "Cancellation_orderId_fkey";

-- AddForeignKey
ALTER TABLE "Cancellation" ADD CONSTRAINT "Cancellation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
