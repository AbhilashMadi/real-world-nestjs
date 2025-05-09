import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: 'admin',
  database: 'mediumclone',
  synchronize: true,
  schema: 'public',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
};

const PostgresDataSource = new DataSource(typeOrmConfig);
PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default PostgresDataSource;
