const { Pool } = require('pg')

const { HOST_DB, PORT_DB, DATABASE_DB, USER_DB, PASSWORD_DB } = process.env
console.log(
    !HOST_DB ? 'HOST_DB is not configured on .env'
    : !PORT_DB ? 'PORT_DV is not configured on .env'
        : !DATABASE_DB ? 'DATABASE_DB is not configured on .env'
            : !USER_DB ? 'USER_DB is not configured on .env'
                : !PASSWORD_DB ? 'PASSWORD_DB is not configured on .env'
                    : 'Database is ocnfigured on .env')


module.exports = new Pool({
    host: HOST_DB,
    POST: Number(PORT_DB),
    database: DATABASE_DB,
    user: USER_DB,
    password: PASSWORD_DB
})