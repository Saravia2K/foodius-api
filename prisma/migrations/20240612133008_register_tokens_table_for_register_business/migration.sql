-- CreateTable
CREATE TABLE "RegisterTokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "invalid" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegisterTokens_pkey" PRIMARY KEY ("id")
);
