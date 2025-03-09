const { db } = require('@vercel/postgres')
// recuperer les tables donné ../lib/placeholder.js
const {
    users,
    customers,
    invoices,
    revenue,
} = require ("../app/lib/placeholder-data.js")
const bcrypt = require ("bcrypt")
async function seedUsers(client) {
    try {
        const createTable = await client.sql`CREATE EXTENSION IF NOT EXIST "uuid-ossp"`;
        client.sql` CREATE TABLE IF NOT EXIST users(
        id UUID DEFAULT uuid_generate(v4) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NUL UNIQUE,
        password TEXT NOT NULL
        )`
        console.log('created "users" table');
        
        const insertedUsers = await Promise.all(
            users.map(async (users)=>{
                const hashedPassword = await bcrypt.hash(users.password, 10)
                return client.sql`
                INSERT INTO users(id,name,email,password)
                VALUE(${users.id},${users.name},${users.email},${hashedPassword})
                ON CONFLICT (id) DO NOTHING
                `
            })
        )
        console.log(`seeded ${insertedUsers.length} users`);
        return {
            createTable,
            user: insertedUsers,
        }
    } catch (err) {
        console.error('Error seedind usuer', err);
        throw err;
    }
}

async function main(params) {
    const client = await db.connect()
    await seedUsers(client)
    // console.log(client);
    // fonction pour creer la table user...ect et lui injecter la data
    await client.end();
}

main().catch((err)=>{
    console.error(
        "une erreur c'est produite : ",
        err
    );
})