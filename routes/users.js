const Router = require('koa2-router');

const AppModule = require('../core/modules/AppModule');

const AUTH_ERROR = 'Autorotation error';

const router = new Router();


const checkSession = async (ctx, next) => {
  ctx.assert(ctx.session.id, AUTH_ERROR, 401);
  next();
};

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  ctx.assert(username && password, 'no valid login data', 401);
  const user = await AppModule.userLogin({ username, password });
  ctx.assert(user, AUTH_ERROR, 401);
  ctx.session.id = user.id;
  ctx.status = 200;
  ctx.body = JSON.stringify('success login');
});

router.post('/logout', checkSession, async (ctx) => {
  ctx.session = null;
  ctx.status = 200;
  ctx.body = JSON.stringify('success logout');
});

module.exports = router;
