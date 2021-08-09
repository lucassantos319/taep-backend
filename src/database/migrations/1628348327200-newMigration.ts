import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigration1628348327200 implements MigrationInterface {
    name = 'newMigration1628348327200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `activities_questions_questions` DROP FOREIGN KEY `FK_4fe4be36c0389b6153ebadd1bcb`");
        await queryRunner.query("ALTER TABLE `activities_questions_questions` DROP FOREIGN KEY `FK_9e52bef38227dad18c3596a6ae1`");
        await queryRunner.query("ALTER TABLE `projects_atividades_activities` DROP FOREIGN KEY `FK_974392b318d217b62da32052689`");
        await queryRunner.query("ALTER TABLE `projects_atividades_activities` DROP FOREIGN KEY `FK_ce4725a7c540057981eb547c913`");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP FOREIGN KEY `FK_1e4e71740315261703c33079a4c`");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP FOREIGN KEY `FK_61ef79a2433639d34fb528aaf72`");
        await queryRunner.query("ALTER TABLE `projects_tags_tags` DROP FOREIGN KEY `FK_0e16f99420fe5a6ae7022afa8b8`");
        await queryRunner.query("ALTER TABLE `projects_tags_tags` DROP FOREIGN KEY `FK_3e919187cc1d287f881fc4f6e4e`");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP FOREIGN KEY `FK_c50fdd1f6925679a3e187b9d2c1`");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP FOREIGN KEY `FK_d4db37310394c13743df4b80978`");
        await queryRunner.query("DROP INDEX `IDX_4fe4be36c0389b6153ebadd1bc` ON `activities_questions_questions`");
        await queryRunner.query("DROP INDEX `IDX_9e52bef38227dad18c3596a6ae` ON `activities_questions_questions`");
        await queryRunner.query("DROP INDEX `IDX_974392b318d217b62da3205268` ON `projects_atividades_activities`");
        await queryRunner.query("DROP INDEX `IDX_ce4725a7c540057981eb547c91` ON `projects_atividades_activities`");
        await queryRunner.query("DROP INDEX `IDX_1e4e71740315261703c33079a4` ON `projects_avisos_notices`");
        await queryRunner.query("DROP INDEX `IDX_61ef79a2433639d34fb528aaf7` ON `projects_avisos_notices`");
        await queryRunner.query("DROP INDEX `IDX_0e16f99420fe5a6ae7022afa8b` ON `projects_tags_tags`");
        await queryRunner.query("DROP INDEX `IDX_3e919187cc1d287f881fc4f6e4` ON `projects_tags_tags`");
        await queryRunner.query("DROP INDEX `IDX_c50fdd1f6925679a3e187b9d2c` ON `users_projetos_projects`");
        await queryRunner.query("DROP INDEX `IDX_d4db37310394c13743df4b8097` ON `users_projetos_projects`");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP COLUMN `created_at`");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD PRIMARY KEY (`usersId`, `projectsId`)");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD PRIMARY KEY (`projectsId`)");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD PRIMARY KEY (`projectsId`, `usersId`)");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD PRIMARY KEY (`projectsId`, `usersId`, `usersEmail`)");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD PRIMARY KEY (`projectsId`, `noticesId`)");
        await queryRunner.query("CREATE INDEX `IDX_9e52bef38227dad18c3596a6ae` ON `activities_questions_questions` (`activitiesId`)");
        await queryRunner.query("CREATE INDEX `IDX_4fe4be36c0389b6153ebadd1bc` ON `activities_questions_questions` (`questionsId`)");
        await queryRunner.query("CREATE INDEX `IDX_c50fdd1f6925679a3e187b9d2c` ON `users_projetos_projects` (`usersId`, `usersEmail`)");
        await queryRunner.query("CREATE INDEX `IDX_d4db37310394c13743df4b8097` ON `users_projetos_projects` (`projectsId`)");
        await queryRunner.query("CREATE INDEX `IDX_0e16f99420fe5a6ae7022afa8b` ON `projects_tags_tags` (`projectsId`)");
        await queryRunner.query("CREATE INDEX `IDX_3e919187cc1d287f881fc4f6e4` ON `projects_tags_tags` (`tagsId`)");
        await queryRunner.query("CREATE INDEX `IDX_1e4e71740315261703c33079a4` ON `projects_avisos_notices` (`projectsId`)");
        await queryRunner.query("CREATE INDEX `IDX_61ef79a2433639d34fb528aaf7` ON `projects_avisos_notices` (`noticesId`)");
        await queryRunner.query("CREATE INDEX `IDX_ce4725a7c540057981eb547c91` ON `projects_atividades_activities` (`projectsId`)");
        await queryRunner.query("CREATE INDEX `IDX_974392b318d217b62da3205268` ON `projects_atividades_activities` (`activitiesId`)");
        await queryRunner.query("ALTER TABLE `activities_questions_questions` ADD CONSTRAINT `FK_9e52bef38227dad18c3596a6ae1` FOREIGN KEY (`activitiesId`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `activities_questions_questions` ADD CONSTRAINT `FK_4fe4be36c0389b6153ebadd1bcb` FOREIGN KEY (`questionsId`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD CONSTRAINT `FK_c50fdd1f6925679a3e187b9d2c1` FOREIGN KEY (`usersId`, `usersEmail`) REFERENCES `users`(`id`,`email`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD CONSTRAINT `FK_d4db37310394c13743df4b80978` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_tags_tags` ADD CONSTRAINT `FK_0e16f99420fe5a6ae7022afa8b8` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_tags_tags` ADD CONSTRAINT `FK_3e919187cc1d287f881fc4f6e4e` FOREIGN KEY (`tagsId`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD CONSTRAINT `FK_1e4e71740315261703c33079a4c` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD CONSTRAINT `FK_61ef79a2433639d34fb528aaf72` FOREIGN KEY (`noticesId`) REFERENCES `notices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_atividades_activities` ADD CONSTRAINT `FK_ce4725a7c540057981eb547c913` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_atividades_activities` ADD CONSTRAINT `FK_974392b318d217b62da32052689` FOREIGN KEY (`activitiesId`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `projects_atividades_activities` DROP FOREIGN KEY `FK_974392b318d217b62da32052689`");
        await queryRunner.query("ALTER TABLE `projects_atividades_activities` DROP FOREIGN KEY `FK_ce4725a7c540057981eb547c913`");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP FOREIGN KEY `FK_61ef79a2433639d34fb528aaf72`");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP FOREIGN KEY `FK_1e4e71740315261703c33079a4c`");
        await queryRunner.query("ALTER TABLE `projects_tags_tags` DROP FOREIGN KEY `FK_3e919187cc1d287f881fc4f6e4e`");
        await queryRunner.query("ALTER TABLE `projects_tags_tags` DROP FOREIGN KEY `FK_0e16f99420fe5a6ae7022afa8b8`");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP FOREIGN KEY `FK_d4db37310394c13743df4b80978`");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP FOREIGN KEY `FK_c50fdd1f6925679a3e187b9d2c1`");
        await queryRunner.query("ALTER TABLE `activities_questions_questions` DROP FOREIGN KEY `FK_4fe4be36c0389b6153ebadd1bcb`");
        await queryRunner.query("ALTER TABLE `activities_questions_questions` DROP FOREIGN KEY `FK_9e52bef38227dad18c3596a6ae1`");
        await queryRunner.query("DROP INDEX `IDX_974392b318d217b62da3205268` ON `projects_atividades_activities`");
        await queryRunner.query("DROP INDEX `IDX_ce4725a7c540057981eb547c91` ON `projects_atividades_activities`");
        await queryRunner.query("DROP INDEX `IDX_61ef79a2433639d34fb528aaf7` ON `projects_avisos_notices`");
        await queryRunner.query("DROP INDEX `IDX_1e4e71740315261703c33079a4` ON `projects_avisos_notices`");
        await queryRunner.query("DROP INDEX `IDX_3e919187cc1d287f881fc4f6e4` ON `projects_tags_tags`");
        await queryRunner.query("DROP INDEX `IDX_0e16f99420fe5a6ae7022afa8b` ON `projects_tags_tags`");
        await queryRunner.query("DROP INDEX `IDX_d4db37310394c13743df4b8097` ON `users_projetos_projects`");
        await queryRunner.query("DROP INDEX `IDX_c50fdd1f6925679a3e187b9d2c` ON `users_projetos_projects`");
        await queryRunner.query("DROP INDEX `IDX_4fe4be36c0389b6153ebadd1bc` ON `activities_questions_questions`");
        await queryRunner.query("DROP INDEX `IDX_9e52bef38227dad18c3596a6ae` ON `activities_questions_questions`");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD PRIMARY KEY (`projectsId`)");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD PRIMARY KEY (`projectsId`, `usersId`)");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD PRIMARY KEY (`projectsId`, `usersEmail`, `usersId`)");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD PRIMARY KEY (`noticesId`, `projectsId`)");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD PRIMARY KEY (`projectsId`, `usersEmail`, `usersId`)");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` DROP COLUMN `created_at`");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("CREATE INDEX `IDX_d4db37310394c13743df4b8097` ON `users_projetos_projects` (`projectsId`)");
        await queryRunner.query("CREATE INDEX `IDX_c50fdd1f6925679a3e187b9d2c` ON `users_projetos_projects` (`usersId`, `usersEmail`)");
        await queryRunner.query("CREATE INDEX `IDX_3e919187cc1d287f881fc4f6e4` ON `projects_tags_tags` (`tagsId`)");
        await queryRunner.query("CREATE INDEX `IDX_0e16f99420fe5a6ae7022afa8b` ON `projects_tags_tags` (`projectsId`)");
        await queryRunner.query("CREATE INDEX `IDX_61ef79a2433639d34fb528aaf7` ON `projects_avisos_notices` (`noticesId`)");
        await queryRunner.query("CREATE INDEX `IDX_1e4e71740315261703c33079a4` ON `projects_avisos_notices` (`projectsId`)");
        await queryRunner.query("CREATE INDEX `IDX_ce4725a7c540057981eb547c91` ON `projects_atividades_activities` (`projectsId`)");
        await queryRunner.query("CREATE INDEX `IDX_974392b318d217b62da3205268` ON `projects_atividades_activities` (`activitiesId`)");
        await queryRunner.query("CREATE INDEX `IDX_9e52bef38227dad18c3596a6ae` ON `activities_questions_questions` (`activitiesId`)");
        await queryRunner.query("CREATE INDEX `IDX_4fe4be36c0389b6153ebadd1bc` ON `activities_questions_questions` (`questionsId`)");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD CONSTRAINT `FK_d4db37310394c13743df4b80978` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `users_projetos_projects` ADD CONSTRAINT `FK_c50fdd1f6925679a3e187b9d2c1` FOREIGN KEY (`usersId`, `usersEmail`) REFERENCES `users`(`id`,`email`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_tags_tags` ADD CONSTRAINT `FK_3e919187cc1d287f881fc4f6e4e` FOREIGN KEY (`tagsId`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_tags_tags` ADD CONSTRAINT `FK_0e16f99420fe5a6ae7022afa8b8` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD CONSTRAINT `FK_61ef79a2433639d34fb528aaf72` FOREIGN KEY (`noticesId`) REFERENCES `notices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_avisos_notices` ADD CONSTRAINT `FK_1e4e71740315261703c33079a4c` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_atividades_activities` ADD CONSTRAINT `FK_ce4725a7c540057981eb547c913` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_atividades_activities` ADD CONSTRAINT `FK_974392b318d217b62da32052689` FOREIGN KEY (`activitiesId`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `activities_questions_questions` ADD CONSTRAINT `FK_9e52bef38227dad18c3596a6ae1` FOREIGN KEY (`activitiesId`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `activities_questions_questions` ADD CONSTRAINT `FK_4fe4be36c0389b6153ebadd1bcb` FOREIGN KEY (`questionsId`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

}
