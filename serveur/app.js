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
  	knex.select('*').from('test.pendu').orderBy(knex.raw('random()')).limit('1').then((mot) => {
  		socket.emit('reponse:mot', mot);
 	});
  });

  socket.on('ajout:mot', (word) => {
  	console.log(word);
  	knex('test.pendu').insert({word: word, difficulty: '3', succeed: 'false'})
  	.then((ret) => {
  		// if(ret.rowCount == 1)
  			
  	})
  	// .catch(err => {

  	// })
  	//insert into test.pendu (word, difficulty, succeed) values ('oiseau', 3, false)
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
