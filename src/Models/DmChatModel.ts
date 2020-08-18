import {Sequelize, Model, DataTypes} from 'sequelize';
import UserModel from './UserModel';

const config = {
  "database": 'chat',
  "username": 'root',
  "password": '1111',
  "host": "127.0.0.1",
  "dialect": "mysql"
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql'
});

class DmChat extends Model {}

DmChat.init({
    no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    msg: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
}, {sequelize, modelName: 'dmChat', tableName: 'dm_Chat'});

DmChat.belongsTo(UserModel, { as: 'user' });
DmChat.belongsTo(UserModel, { as: 'friends' });

export default DmChat;