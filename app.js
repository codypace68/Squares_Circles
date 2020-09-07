const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');


// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(serve('./views/'));
app.use(serve('./public'));

app.listen(process.env.PORT || 3000);
