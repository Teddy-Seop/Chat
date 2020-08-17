"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const UserModel_1 = __importDefault(require("./UserModel"));
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
class RoomUserList extends sequelize_1.Model {
}
RoomUserList.init({
    no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    msg: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: false
    },
}, { sequelize, modelName: 'dmChat', tableName: 'dmChat' });
RoomUserList.belongsTo(UserModel_1.default, { as: 'uno' });
RoomUserList.belongsTo(UserModel_1.default, { as: 'fno' });
exports.default = RoomUserList;
//# sourceMappingURL=DmCharModel.js.map