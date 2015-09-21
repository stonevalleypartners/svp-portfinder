var net = require('net');
var argue = require('arguejs');

function findAvailablePort() {
  var args = argue({
    addr: [String]
  }, arguments);
  
  return new Promise( function(resolve) {
    var server = net.createServer();
    
    function _onListening() {
      var port = server.address().port;
      server.close(function() {
        resolve(port);
      });
    }
    
    if (args.addr) {
      server.listen(0, args.addr, _onListening);
    } else {
      server.listen(0, _onListening);
    }
  });
}
                    
if (module === require.main) {
  console.log('get a port');
  findAvailablePort()
    .then((port) => { 
      console.log(' - got '+port);

      console.log('get another port');
      findAvailablePort('127.0.0.1')
        .then((port) => {
        console.log(' - got '+port);

        console.log('rebind port');
        var server = net.createServer();
        server.listen(port, '127.0.0.1', function() {
          console.log(' - successfully rebound port '+server.address().port);
          server.close();
        });
      });
  });
}

module.exports.findAvailablePort = findAvailablePort;
