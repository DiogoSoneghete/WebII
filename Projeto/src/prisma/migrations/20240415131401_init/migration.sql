/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_telegram" TEXT NOT NULL,
    "name" TEXT
);
INSERT INTO "new_User" ("id", "id_telegram", "name") SELECT "id", "id_telegram", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_telegram_key" ON "User"("id_telegram");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
