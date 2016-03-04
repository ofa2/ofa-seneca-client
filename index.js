var _ = require('lodash');

function lift (done) {
  var self = this;
  var senecaConnectionName = (self.config.seneca || {}).connection;
  var senecaConnection = self.config.connections[senecaConnectionName];
  if(senecaConnectionName && !senecaConnection) {
    throw new Error('unknown seneca connection:' + senecaConnectionName);
  }

  if(senecaConnection.transport) {
    self.seneca.use(senecaConnection.transport);
  }

  self.seneca.client(senecaConnection.options);
  process.nextTick(done);
}

function lower (done) {
  this.seneca.close(done);
}

module.exports = {
  lift: lift,
  lower: lower
};
