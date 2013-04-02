# Express remote REPL

Remote REPL with infinite connection (can be used with supervisor)

## Usage

In the app.js :

```
require('express-repl')(app);
```

Connect to repl :
```
./bin/repl
```

Commands :

```
app
routes
```
## Example

```

var express = require('express')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
});

app.get('/', function(req, res) {
    res.send('Ok');
});

// Activate remote repl
require('express-repl')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


```
