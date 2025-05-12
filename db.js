import { createConnection } from 'mysql2';

export function createDbConnection() {
    const conn = createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ani7447',
        database: 'EcommerceMERN'
    });

    conn.connect((error) => {
        if (error) console.log("DB connection failed", error);
        else console.log("DB Connected!");
    });

    return conn;
}

export const conn = createDbConnection();
