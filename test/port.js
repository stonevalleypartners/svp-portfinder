var Promise = require('bluebird');
var net = require('net');
var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

var portFinder = require('../lib');

describe('portFinder', () => {
  var firstPort, secondPort;

  it('get a port', () => {
    return portFinder()
      .then((port) => {
        firstPort = port;
        var server = Promise.promisifyAll(net.createServer());
        return server.listenAsync(port);
      })
      .should.eventually.be.fulfilled;
  });

  it('get another port', () => {
    return portFinder('127.0.0.1')
      .then((port) => {
        secondPort = port;
        secondPort.should.not.equal(firstPort);
        var server = Promise.promisifyAll(net.createServer());
        return server.listenAsync(port);
      })
      .should.eventually.be.fulfilled;
  });

  it('cannot obtain port for bad address', () => {
    return portFinder('8.8.8.8')
      .should.eventually.be.rejected;
  });
});

