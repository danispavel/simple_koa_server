const Router = require('koa2-router');

const router = new Router();

router.get('/ping', async (ctx) => { ctx.body = 'pong'; ctx.status = 200; });

module.exports = router;
