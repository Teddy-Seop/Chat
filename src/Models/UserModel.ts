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

class User extends Model {}

User.init({
    no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    pw: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
}, {sequelize, modelName: 'user', tableName: 'user', timestamps: true});

export default User;