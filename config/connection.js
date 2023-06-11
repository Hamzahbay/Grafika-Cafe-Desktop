// import { Sequelize } from "sequelize"
const { Sequelize } = require("sequelize")

const root = {
    name: 'root',
    password: 'admin081230',
    port: '1030'
}
const bagus = {
    name: 'bagus',
    password: 'poallo342',
    port: '3306'
}

const connection = new Sequelize('grafika_cafe', root.name, root.password, { host: 'localhost', dialect: 'mysql', port: root.port })

connection.authenticate().then(res => console.log(`Database is on!`)).catch(err => console.log(err))

// export default connection
module.exports = connection