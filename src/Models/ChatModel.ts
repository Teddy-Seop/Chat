import {Sequelize, Model, DataTypes} from 'sequelize';
import Room from './RoomModel';
import User from './UserModel';

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

class Chat extends Model {}

Chat.init({
    no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    msg: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING(300),
        allowNull: false
    }
}, {sequelize, modelName: 'chat', tableName: 'chat', timestamps: true});

Chat.belongsTo(User);
Chat.belongsTo(Room);

export default Chat;