import * as express from 'express';

const testRouter = express.Router();

testRouter.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.json({
    message: 'API is UP'
  })
});

export { testRouter }