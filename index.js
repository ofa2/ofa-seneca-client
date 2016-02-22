module.exports = function (done) {
  var self = this;
  self.senecaClient = self.seneca
    .use('seneca-amqp-transport')
    .client({
      type: 'amqp',
      pin: 'role:api'
    });
  process.nextTick(done);
};
