const { db } = require('@vercel/postgres')
// recuperer les tables : data ../lib/placeholder.js
const {
    users,
    customers,
    invoices,
    revenue,
} = require ("../lib/placeholder-data.js")
const bcrypt = require ("bcrypt")

async function seedUsers(client) {
    try {
        await client.sql`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = client.sql` CREATE TABLE IF NOT EXISTS users(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        );
        `;
        console.log('created "users" table');
        
        const insertedUsers = await Promise.all(
            users.map(async(user)=>{    
                const hashedPassword = await bcrypt.hash(user.password, 10)
                return client.sql`
                INSERT INTO users(id,name,email,password)   
                VALUES(${user.id},${user.name},${user.email},${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );
        console.log(`seeded ${insertedUsers.length} users`);
        return {
            createTable,
            user: insertedUsers,
        }
    } catch (err) {
        console.error('Error seedind user', err);
        throw err;
    }
}

async function seedInvoices(client) {
    try {
        await client.sql
        const createTable = client.sql` 
        CREATE TABLE IF NOT EXISTS invoices(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
        );
        `;
        console.log('created "invoices" table');
        
        const insertedInvoices = await Promise.all(
            invoices.map(
                (invoice)=>client.sql`
                INSERT INTO invoices(customer_id,amount,status,date)
                VALUES(${invoice.customer_id},${invoice.amount},${invoice.status},${invoice.date})  
                ON CONFLICT (id) DO NOTHING;
                `,
            ),
        );
       
        console.log(`seeded ${insertedInvoices.length} invoices`);
        return {
            createTable,
            invoices: insertedInvoices,
        }
    } catch (err) {
        console.error('Error seedind invoices', err);
        throw err;
    }
}

async function seedCustomers(client){
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = client.sql` CREATE TABLE IF NOT EXISTS customers(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
        );
        `;
        console.log('created "customers" table');
        
        const insertedCustomers = await Promise.all(
            customers.map(
                (customer)=>client.sql`
                INSERT INTO customers(id,name,email,image_url)
                VALUES(${customer.id},${customer.name},${customer.email},${customer.image_url})  
                ON CONFLICT (id) DO NOTHING;
                `,
            ),
        );
        
        console.log(`seeded ${insertedCustomers.length} customers`);
        return {
            createTable,
            customers: insertedCustomers,
        }
    } catch (err) {
        console.error('Error seedind customers', err);
        throw err;
    }
}

async function seedRevenue(client) {
    try {
        const createTable = await client.sql;
        client.sql` CREATE TABLE IF NOT EXISTS revenue(
        month VARCHAR(10) NOT NULL,
        revenue INT NOT NULL
        );
        `;
        console.log('created "revenue" table');
        
        const insertedRevenue = await Promise.all(
            revenue.map(
                (rev)=>client.sql`
                INSERT INTO revenue(month,revenue)
                VALUES(${rev.month},${rev.revenue}) 
                ON CONFLICT (month) DO NOTHING;
                `,
            ),
        );
   
        console.log(`seeded ${insertedRevenue.length} revenue`);
        return {
            createTable,
            revenue: insertedRevenue,
        }   
    } catch (err) {
        console.error('Error seedind revenue', err);
        throw err;
    }
}

async function main() {
    const client = await db.connect();
    await seedUsers(client);
    await seedInvoices(client);
    await seedCustomers(client);
    await seedRevenue(client);
    // console.log(client);
    // fonction pour creer la table user...ect et lui injecter la data
    await client.end();
}

main().catch((err)=>{
    console.error(
        "une erreur c'est produite : ",
        err
    );
});