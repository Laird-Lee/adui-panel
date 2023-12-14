import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';

/**
 * Represents the data source configuration for the application.
 * @property {string} type - The type of the database.
 * @property {string} url - The URL of the database.
 * @property {string} host - The host of the database.
 * @property {number} port - The port of the database.
 * @property {string} username - The username for connecting to the database.
 * @property {string} password - The password for connecting to the database.
 * @property {string} database - The name of the database.
 * @property {boolean} synchronize - Whether to synchronize the database schema.
 * @property {boolean} dropSchema - Whether to drop the schema before synchronization.
 * @property {boolean} keepConnectionAlive - Whether to keep the database connection alive.
 * @property {boolean} logging - Whether to enable logging for database operations.
 * @property {Array<string>} entities - The paths to the entity files.
 * @property {Array<string>} migrations - The paths to the migration files.
 * @property {Object} cli - The CLI options.
 * @property {string} cli.entitiesDir - The directory for entity files in the CLI.
 * @property {string} cli.migrationsDir - The directory for migration files in the CLI.
 * @property {string} cli.subscribersDir - The directory for subscriber files in the CLI.
 * @property {Object} extra - The extra options.
 * @property {number} extra.max - The maximum connection pool size.
 * @property {Object} extra.ssl - The SSL options.
 * @property {boolean} extra.ssl.rejectUnauthorized - Whether to reject unauthorized SSL certificates.
 * @property {string} extra.ssl.ca - The path to the CA certificate file.
 * @property {string} extra.ssl.key - The path to the client key file.
 * @property {string} extra.ssl.cert - The path to the client certificate file.
 */
export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
  extra: {
    // based on https://node-postgres.com/api/pool
    // max connection pool size
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    ssl:
      process.env.DATABASE_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized:
              process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
            ca: process.env.DATABASE_CA ?? undefined,
            key: process.env.DATABASE_KEY ?? undefined,
            cert: process.env.DATABASE_CERT ?? undefined,
          }
        : undefined,
  },
} as DataSourceOptions);
