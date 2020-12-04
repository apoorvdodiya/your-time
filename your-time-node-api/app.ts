import * as dotenv from 'dotenv';
dotenv.config();
import express, { Router } from 'express';
import * as bodyparser from 'body-parser';
import { router } from './src/routes/index';
import './src/config/db/index';
import './src/models/user.model';
import * as config from './src/config/index';
import { IRequest } from './src/interfaces/IRequest';
import { init } from './src/config/db/relation';

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req: IRequest, res: express.Response, next: express.NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,json,authentication,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(config.urlLogger);

app.use(router);

app.use(config.handleError);
app.use(config.handleSuccess);
app.use(config.handle404);

app.listen(process.env.PORT, () => {
  console.log('server started on port', process.env.PORT);
  init();
});