//
// _______ _______ _______ _______ _______ ______         _______  ______ _______
// |_____| |______ |______ |______ |  |  | |_____] |      |_____| |  ____ |_____
// |     | ______| ______| |______ |  |  | |_____] |_____ |     | |_____| |_____
//                                                                                  
// Repl Server

var repl = require('repl');
var net = require('net');
var util = require('util');

function format_route_to_string(method, route) {
    return method + '_' + route.substring(1)
	.replace(/(:.*)\//, '')
	.replace(/\/:.*/, '')
	.replace(/\//g, '_');
}

function ReplServer(app) {

    console.log('Launching REPL');

    var routes = {};

    for (var key in app.routes) {
	if (app.routes.hasOwnProperty(key)) {
	    var r = app.routes[key];
	    r.forEach(function(ro) {
		routes[format_route_to_string(ro.method,ro.path)] = ro.path;
	    });
	}
    }

    net.createServer(function(socket) {
	var r = repl.start({
	    prompt: 'App - ' + app.get('env') + ' > ',
	    input: socket,
	    output: socket,
	    terminal: true,
	    useGlobal: true,
	    useColor : true
	});
	r.on('exit', function () {
	    socket.end();
	});
	r.context.app = app;
	r.context.routes = routes;
    }).listen(1337);
};

module.exports = ReplServer;
