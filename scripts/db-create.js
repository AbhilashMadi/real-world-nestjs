const { execSync } = require('child_process');

const name = process.argv[2];
if (!name) {
  console.error(
    'Please provide a migration name. Usage: npm run db:create <MigrationName>',
  );
  process.exit(1);
}

const cmd = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --dataSource=src/config/orm.config.ts migration:generate src/migrations/${name}`;
execSync(cmd, { stdio: 'inherit' });
