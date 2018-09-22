/* eslint linebreak-style: 0 */
/* eslint no-console: "off" */
import dotenv from 'dotenv';
import express from 'express';

import router from './routes';

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: 'true',
    message: 'Welcome to home page',
  });
});
app.use('/api/v1', router);
app.use('*', (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: 'false',
    message: err.message,
  });
  next();
});

app.listen(port, () => console.log(`Running on port ${port}...`));

export default app;
