"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = {
    "database": 'chat',
    "username": 'root',
    "password": '1111',
    "host": "127.0.0.1",
    "dialect": "mysql"
};
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql'
});
class Chat extends sequelize_1.Model {
}
Chat.init({
    no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    msg: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: false
    },
    uid: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: false
    }
}, { sequelize, modelName: 'room', tableName: 'room', timestamps: true });
exports.default = Chat;
//# sourceMappingURL=Chat.js.map