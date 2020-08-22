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

class Friending extends Model {}

Friending.init({
    no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {sequelize, modelName: 'friending', tableName: 'friending'});

Friending.belongsTo(UserModel, { as: 'user' });
Friending.belongsTo(UserModel, { as: 'friends' });

export default Friending;