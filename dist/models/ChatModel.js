"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const RoomModel_1 = __importDefault(require("./RoomModel"));
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
}, { sequelize, modelName: 'chat', tableName: 'chat', timestamps: true });
Chat.belongsTo(UserModel_1.default);
Chat.belongsTo(RoomModel_1.default);
exports.default = Chat;
//# sourceMappingURL=ChatModel.js.map