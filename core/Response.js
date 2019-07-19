class Response {
  static text(ctx, text = '') {
    ctx.status = 200;
    ctx.body = text;
    ctx.type = 'text/plain; charset=utf-8';
  }

  static json(ctx, json = {}) {
    ctx.status = 200;
    ctx.type = 'json';
    ctx.body = json;
  }

  static error(ctx, message = 'Server error', status = 500) {
    ctx.status = status;
    ctx.type = 'json';
    ctx.body = { success: 0, message };
  }

  static success(ctx, data = {}) {
    ctx.status = 200;
    ctx.type = 'json';
    ctx.body = { success: 1, ...data };
  }
}

module.exports = Response;
