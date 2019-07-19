const Router = require('koa2-router');

const AppModule = require('../core/modules/AppModule');

const router = new Router();

const checkSession = async (ctx, next) => {
  ctx.assert(ctx.session.id, 'ne mona', 401);
  next();
};

router.post('/ideas', checkSession, async (ctx) => {
  const { title, description } = ctx.request.body;

  ctx.assert(
    (/^.{4,20}$/i.test(title))
        && (/^.{20,}$/i.test(description)),
    400, 'No corect data',
  );

  const newId = await AppModule.addIdea({ title, description, author: ctx.session.id });
  const addedIdea = await AppModule.getIdeaById(newId);
  ctx.status = 200;
  ctx.body = addedIdea;
});

router.get('/ideas', checkSession, async (ctx) => {
  const ideas = await AppModule.getIdeas(ctx);
  ctx.body = ideas;
  ctx.status = 200;
});

router.get('/ideas/:id', checkSession, async (ctx) => {
  const { id } = ctx.params;
  const idea = await AppModule.getIdeaById(id);
  ctx.body = idea;
  ctx.status = 200;
});

router.delete('/ideas/:id', checkSession, async (ctx) => {
  const { id } = ctx.params;
  await AppModule.deleteIdea(id);
  ctx.body = JSON.stringify(id);
  ctx.status = 200;
});


router.patch('/ideas/:id', checkSession, async (ctx) => {
  const { id } = ctx.params;
  const { title, description, author } = ctx.request.body;

  ctx.assert(
    ((/^.{4,20}$/i.test(title) || !title)
      && (/^.{20,}$/i.test(description) || !description)
      && (/^[a-zA-Z]{4,}$/i.test(author) || !author)),
    400, 'No correct data',
  );
  if (await AppModule.editIdea({
    id, title, description, author,
  })) {
    const editedIdea = await AppModule.getIdeaById(id);
    ctx.body = editedIdea;
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify({ success: 0 });
    ctx.status = 500;
  }
});
module.exports = router;
