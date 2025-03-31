-- AlterTable
ALTER TABLE "shoutMessage" ADD COLUMN     "subId" INTEGER DEFAULT 1;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "added_mailer" INTEGER,
ADD COLUMN     "chest2" TEXT;

-- CreateTable
CREATE TABLE "forums" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "public" INTEGER NOT NULL,
    "order" INTEGER,
    "description" TEXT,

    CONSTRAINT "forums_pkey" PRIMARY KEY ("id")
);
