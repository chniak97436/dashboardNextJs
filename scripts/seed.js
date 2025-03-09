const { db } = require('@vercel/postgres')

async function main(params) {
    const client = await db.connect()
    console.log(client);
    console.log("params : ", params);
    await client.end();
}

main().catch((err)=>{
    console.error(
        "une erreur c'est produite : ",
        err
    );
})