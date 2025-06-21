/*
  Warnings:

  - You are about to drop the `edges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `edges` DROP FOREIGN KEY `fk_edges_from_note`;

-- DropForeignKey
ALTER TABLE `edges` DROP FOREIGN KEY `fk_edges_to_note`;

-- DropForeignKey
ALTER TABLE `edges` DROP FOREIGN KEY `fk_edges_user`;

-- DropTable
DROP TABLE `edges`;

-- CreateTable
CREATE TABLE `relations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `source_note_id` INTEGER UNSIGNED NOT NULL,
    `target_note_id` INTEGER UNSIGNED NOT NULL,
    `relation_type` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `source_note_id_idx`(`source_note_id`),
    INDEX `target_note_id_idx`(`target_note_id`),
    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `relations` ADD CONSTRAINT `relations_source_note_id_fkey` FOREIGN KEY (`source_note_id`) REFERENCES `notes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relations` ADD CONSTRAINT `relations_target_note_id_fkey` FOREIGN KEY (`target_note_id`) REFERENCES `notes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relations` ADD CONSTRAINT `fk_relations_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
