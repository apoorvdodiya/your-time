import { BIGINT, DataTypes, Model, STRING } from 'sequelize';
import { sequelize } from '../config/db/index';

export class Profile extends Model { }

Profile.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: BIGINT,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  profile_picture: {
    type: DataTypes.STRING
  },
  background: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'profiles'
});
