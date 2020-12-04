import { DataTypes, Model, STRING } from 'sequelize';
import { sequelize } from '../config/db/index';

export class User extends Model { }

User.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'users'
})
