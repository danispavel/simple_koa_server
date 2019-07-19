const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const mainRoutes = require('../routes/main');
const ideasRoutes = require('../routes/ideas');
const usersRoutes = require('../routes/users');

const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
};


app.init = async () => {
  app.use(cors({
    credentials: true,
  }));

  app.use(bodyParser());
  app.use(session(CONFIG, app));
  app.use(mainRoutes);
  app.use(ideasRoutes);
  app.use(usersRoutes);
};

module.exports = app;
