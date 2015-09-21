# svp-portfinder
Test library for finding a TCP port for servers

## install

`npm install git@github.com:stonevalleypartners/svp-portfinder.git`

## use

```
var portFinder = require('svp-portfinder');

portFinder()
  .then((port) => {
    // create test server running on this port
  });
```
