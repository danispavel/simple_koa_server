const http = require('http');

class Server {
  constructor(app) {
    this.app = app;
    this.server = http.Server(app.callback());
    app.context.server = this;
  }

  async start(port) {
    console.log(`Server listen on port ${port}`);
    return this.server.listen(port);
  }
}

module.exports = Server;
