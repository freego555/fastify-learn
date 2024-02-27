import dotenv from 'dotenv';
const pathToConfig = process.env.PATH_TO_CONFIG
  ? process.env.PATH_TO_CONFIG
  : './config.env';
dotenv.config({ path: pathToConfig });

const HOST: string = process.env.HOST ? process.env.HOST : '0.0.0.0';
const PORT = process.env.PORT ? +process.env.PORT : 3001;

const exitProcess = (code: number | undefined) => {
  process.exit(code);
};

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err);

  exitProcess(1);
});

import app from './app';

app.listen({ host: HOST, port: PORT }, (err) => {
  if (err) {
    console.error(err);

    exitProcess(1);
  }
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err);

  app
    .close()
    .then(() => {
      console.log('Server is closed.');
    })
    .catch((appErr) => {
      console.error('Server is closed with error.');
      console.error(appErr);
    })
    .finally(() => {
      exitProcess(1);
    });
});
