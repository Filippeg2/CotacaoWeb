var express = require('express');
var app = express();
var router = express.Router();

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var log = require('./commons/log.js');

/*
var bodyParser = require('body-parser');
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({     
  extended: true
})); 
*/
app.use(express.static("../public"));
app.use(function(req, res, next){
  //log.logar('app', 'requisicao recebida', './log/'):
  console.log('entrou no use');
  console.log("*************************************************");
  console.log("-------------- MIDDLEWARE - COTACAO -------------"); 
  console.log("*************************************************");
  
  res.setHeader('Access-Control-Allow-Origin', 'moedahoje.com.br');   
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');    
  res.setHeader('Content-Type', 'application/json');

  /*if(req.hostname != 'moedahoje.com.br')
      log.logar('app', 'requisicao do ' + req.hostname + ' rejeitada', './log/'):
      res.status(403);
      res.end();
   */

  next();
});

//ROTA COTACAO
require('./route/routerCotacao.js')(router);

app.use('/api', router);

//PROD

var server = app.listen(3000, function(){	
	var port = server.address().port;
	console.log('startou na porta ' + port);

});

//DEV
/*
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});
*/