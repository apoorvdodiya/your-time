import { Activity } from '../../models/activity.model';
import { Profile } from '../../models/profile.model';
import { User } from '../../models/user.model';
import { sequelize } from './index';

User.hasOne(Profile, { foreignKey: 'user_id' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Activity, { foreignKey: 'user_id' });
Activity.belongsTo(User, { foreignKey: 'user_id' });

export const init = () => {
  sequelize.sync({ force: (process.env.DB_SYNC === 'true') })
    .then(res => {
      console.log('DB Sync Successful');
    })
    .catch(err => {
      console.log('Error::', err);
    });
}