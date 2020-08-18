import {Sequelize, Model, DataTypes} from 'sequelize';

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

class Room extends Model {}

Room.init({
    no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
}, {sequelize, modelName: 'room', tableName: 'room', timestamps: true});

export default Room;