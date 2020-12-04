import { Sequelize} from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_URL, { logging: false });

sequelize.authenticate()
  .then(() => {
    console.log('connected');
  })
  .catch(err => {
    console.log('Error::', err);
  })