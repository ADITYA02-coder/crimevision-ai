/*
  Warnings:

  - You are about to drop the column `crimeDate` on the `cases` table. All the data in the column will be lost.
  - You are about to drop the column `crimeTime` on the `cases` table. All the data in the column will be lost.
  - Added the required column `crimeDateTime` to the `cases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cases` DROP COLUMN `crimeDate`,
    DROP COLUMN `crimeTime`,
    ADD COLUMN `crimeDateTime` DATETIME(3) NOT NULL;
