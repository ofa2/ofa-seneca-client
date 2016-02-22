var _ = require('lodash');

module.exports = function (done) {
  var self = this;
  var senecaConnectionName = (self.config.seneca || {}).connection;
  var senecaConnection = self.config.connections[senecaConnectionName];
  if(senecaConnectionName && !senecaConnection) {
    throw new Error('unknown seneca connection:' + senecaConnectionName);
  }

  self.senecaClient = self.seneca
    .use(require('seneca-amqp-transport'))
    .client(_.merge({
      type: 'amqp',
      pin: 'role:api'
    }, senecaConnection));
  process.nextTick(done);
};
