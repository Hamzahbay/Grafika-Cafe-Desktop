// import connection from "../config/connection.js"
// import { DataTypes } from "sequelize"
const connection = require("../config/connection.js")
const { DataTypes } = require("sequelize")

const Menu = connection.define('menu', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
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
    pic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: 'menu', freezeTableName: true, timestamps: false })

// export { Menu }
module.exports = Menu