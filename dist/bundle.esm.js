import { merge } from 'lodash';
import Promise from 'bluebird';

function lift(done) {
  let self = this;
  let senecaConnectionName = merge({}, self.config.seneca, (self.config.seneca || {}).client).connection;
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

export default index;
//# sourceMappingURL=bundle.esm.js.map
