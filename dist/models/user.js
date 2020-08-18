"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// import db from './index';
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
class User extends sequelize_1.Model {
}
User.init({
    no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pw: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    }
}, { sequelize, modelName: 'user', tableName: 'user', timestamps: true });
exports.default = User;
//# sourceMappingURL=User.js.map