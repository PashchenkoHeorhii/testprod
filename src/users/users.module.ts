import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import databaseConfig from 'src/database/config/database.config';
import { DocumentUserPersistenceModule } from './database/document/document-persistence.module';
import { RelationalUserPersistenceModule } from './database/relational/relational-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentUserPersistenceModule
  : RelationalUserPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
