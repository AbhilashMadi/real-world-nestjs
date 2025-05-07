import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TagEntity } from '~/tag/tag.entity';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: 'admin',
  database: 'mediumclone',
  entities: [join(__dirname, '**', '*.entity.{ts,js}'), TagEntity],
  synchronize: false,
  migrations: [join(__dirname, 'migrations', '**', '*{.ts,.js}')],
};

export default new DataSource(typeOrmConfig);
