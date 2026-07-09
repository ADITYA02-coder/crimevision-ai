-- CreateTable
CREATE TABLE `cases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `crimeNumber` VARCHAR(191) NOT NULL,
    `firNumber` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `crimeDate` DATETIME(3) NOT NULL,
    `crimeTime` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `policeStation` VARCHAR(191) NOT NULL,
    `crimeType` VARCHAR(191) NOT NULL,
    `crimeSubType` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `status` ENUM('OPEN', 'UNDER_INVESTIGATION', 'CHARGESHEET_FILED', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `cases_crimeNumber_key`(`crimeNumber`),
    UNIQUE INDEX `cases_firNumber_key`(`firNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cases` ADD CONSTRAINT `cases_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
