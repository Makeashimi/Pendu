var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var knex = require('knex')({
  	client: 'pg',
  	connection: {
    	host : '127.0.0.1',
    	user : 'postgres',
    	password : 'root',
    	database : 'testdb'
  	}
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('demande:mot', (message) => {
  	console.log('request for word')
  	knex.select('*').from('test.pendu').orderBy(knex.raw('random()')).limit('1').then((mot) => {
  		socket.emit('reponse:mot', mot);
 	});
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
