var net = require('net');
var argue = require('arguejs');

function portFinder() {
  var args = argue({
    addr: [String]
  }, arguments);
  
  return new Promise( function(resolve, reject) {
    var server = net.createServer();
    server.on('error', reject);
    
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
                    
module.exports = portFinder;
