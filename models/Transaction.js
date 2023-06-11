// import connection from "../config/connection.js"
// import { DataTypes } from "sequelize"
const connection = require("../config/connection.js")
const { DataTypes } = require("sequelize")

const Transaction = connection.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tbl_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'transaction', freezeTableName: true, timestamps: false })

// export { Transaction }
module.exports = Transaction