import { BIGINT, DataTypes, Model, STRING } from 'sequelize';
import { sequelize } from '../config/db/index';

export class Activity extends Model { }

Activity.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  limit: {
    type: DataTypes.INTEGER
  },
  minutes: {
    type: DataTypes.INTEGER
  },
  time: {
    type: DataTypes.BIGINT
  }
}, {
  sequelize,
  modelName: 'activities'
});
