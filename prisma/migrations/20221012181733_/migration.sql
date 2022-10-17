-- AlterTable
ALTER TABLE "Series" ADD COLUMN "image_path" TEXT;
ALTER TABLE "Series" ADD COLUMN "image_thumbnail_path" TEXT;

-- CreateTable
CREATE TABLE "Images" (
    "link" TEXT NOT NULL PRIMARY KEY,
    "seriesId" TEXT NOT NULL,
    CONSTRAINT "Images_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
