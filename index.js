var _ = require('lodash');

module.exports = function (done) {
  var self = this;
  var senecaConnectionName = (self.config.seneca || {}).connection;
  var senecaConnection = self.config.connections[senecaConnectionName];
  if(senecaConnectionName && !senecaConnection) {
    throw new Error('unknown seneca connection:' + senecaConnectionName);
  }

  self.senecaClient = self.seneca
    .use(senecaConnection.transport)
    .client(senecaConnection.options);
  process.nextTick(done);
};
