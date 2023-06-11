// import connection from "../config/connection.js"
// import { DataTypes } from "sequelize"
const connection = require("../config/connection.js")
const { DataTypes } = require("sequelize")

const Tbl = connection.define('tbl', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: 'tbl', freezeTableName: true, timestamps: false })

// export { Tbl }
module.exports = Tbl