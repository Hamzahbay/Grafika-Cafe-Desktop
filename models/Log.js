// import connection from "../config/connection.js"
// import { DataTypes } from "sequelize"
const connection = require("../config/connection.js")
const { DataTypes } = require("sequelize")

const Log = connection.define('log', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.JSON,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: 'log', freezeTableName: true, timestamps: false })

// export { Log }
module.exports = Log