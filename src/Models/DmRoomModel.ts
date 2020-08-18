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

class DmRoom extends Model {}

DmRoom.init({
    no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
}, {sequelize, modelName: 'dmRoom', tableName: 'dmRoom'});

DmRoom.belongsTo(UserModel, { as: 'user1' });
DmRoom.belongsTo(UserModel, { as: 'user2' });

export default DmRoom;