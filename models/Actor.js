// import connection from "../config/connection.js"
// import { DataTypes } from "sequelize"
const connection = require("../config/connection.js")
const { DataTypes } = require("sequelize")

const Actor = connection.define('actor', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'actor', freezeTableName: true, timestamps: false })

// export { Actor }
module.exports = Actor