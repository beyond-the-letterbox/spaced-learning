-- CreateTable
CREATE TABLE `RelationType` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `relation_id` INTEGER UNSIGNED NOT NULL,
    `type` ENUM('parent_child', 'depends_on', 'linked', 'reference', 'example_of', 'contradicts', 'supports', 'custom') NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `RelationType_relation_id_type_key`(`relation_id`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RelationType` ADD CONSTRAINT `RelationType_relation_id_fkey` FOREIGN KEY (`relation_id`) REFERENCES `relations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
