var net = require('net');
var EverSocket = require('../lib/eversocket.js').EverSocket;

var socket = new EverSocket({
    type: 'tcp4',
    reconnectWait: 100,      // wait 100ms after close event before reconnecting
    reconnectOnTimeout: true // reconnect if the connection is idle
});

function pipe_data() {
    process.stdin.pipe(socket);
    socket.pipe(process.stdout);

    process.stdin.on('end', function () {
       sock.destroy();
   });

    process.stdin.on('data', function (b) {
       if (b.length === 1 && b[0] === 4) {
           process.stdin.emit('end');
       }
   });
}

socket.connect(1337);

socket.on('reconnect', function() {
    console.log();
    console.log('Reconnection');    
    pipe_data();
});

socket.on('close', function fdone() {
    process.stdin.setRawMode(false);
    console.log('');
    console.log('Connection closed - waiting for server');
    socket.removeListener('close', fdone);
});

pipe_data();

