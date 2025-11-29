-- AlterTable
ALTER TABLE "Gift" ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "contributionAmount" DROP NOT NULL;

-- CreateTable
CREATE TABLE "GiftLink" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "giftId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiftLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GiftLink" ADD CONSTRAINT "GiftLink_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
