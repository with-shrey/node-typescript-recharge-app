import path from 'path';

const KnexConfig = {
    development: {
        client: 'mysql',
        connection: {
            host: 'db',
            user: 'root',
            password: 'root',
            database: 'axom'
        },
        pool: {min: 0, max: 10},
        migrations: {
            extension: 'ts',
            directory: path.join(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            extension: 'ts',
            directory: path.join(__dirname, '..', 'database', 'seeds')
        }
    },
    production: {
        client: 'mysql',
        connection: {
            host: 'db',
            user: 'root',
            password: 'root',
            database: 'axom'
        },
        pool: {min: 0, max: 10},

        migrations: {
            extension: 'ts',
            directory: path.join(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            extension: 'ts',
            directory: path.join(__dirname, '..', 'database', 'seeds')
        }
    }
};

export default KnexConfig;
