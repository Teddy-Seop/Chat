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
class Friending extends sequelize_1.Model {
}
Friending.init({
    no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    }
}, { sequelize, modelName: 'friending', tableName: 'friending' });
Friending.belongsTo(UserModel_1.default, { as: 'user' });
Friending.belongsTo(UserModel_1.default, { as: 'friends' });
exports.default = Friending;
//# sourceMappingURL=FriendingModel.js.map