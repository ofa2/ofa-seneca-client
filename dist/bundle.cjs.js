'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lodash = require('lodash');
var Promise = _interopDefault(require('bluebird'));

function lift(done) {
  let self = this;
  let senecaConnectionName = lodash.merge({}, self.config.seneca, (self.config.seneca || {}).client).connection;
  let senecaConnection = self.config.connections[senecaConnectionName];

  if (senecaConnectionName && !senecaConnection) {
    throw new Error(`unknown seneca connection:${senecaConnectionName}`);
  }

  if (senecaConnection.transport) {
    self.seneca.use(senecaConnection.transport);
  }

  self.seneca.client(senecaConnection.options);
  process.nextTick(done);
}

function lower(done) {
  this.seneca.close(done);
}

var index = {
  lift: Promise.promisify(lift),
  lower: Promise.promisify(lower)
};

module.exports = index;
//# sourceMappingURL=bundle.cjs.js.map
