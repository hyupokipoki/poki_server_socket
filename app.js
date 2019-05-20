// const express = require('express');


// const app = express();



// const server = app.listen(3000, function() {
//     console.log('server running on port 3000');
// });


// const io = require('socket.io')(server);

// io.on('connection', function(socket) {
//     console.log(socket.id)
//     socket.on('SEND_MESSAGE', function(data) {
//         console.log(data)
//         io.emit('MESSAGE', data)
//     });
// });

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server,{
  pingTimeout: 1000,
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// localhost:3000서버에 접속하면 클라이언트로 메세지을 전송한다
app.get('/', function(req, res) {
//   res.sendFile('Hellow Chating App Server');

});

io.on('connection', function(socket){

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    console.log('Message from %s: %s', data.name, data.msg);

    // data.msg로 결과값을 만들어서 msg에 지정해서 보내주면 될 듯!
    var msg = {
        from: {
          name: 'poki',
        },
        msg: 'hello'
      };
    socket.emit('chat', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });


});

server.listen(3000);