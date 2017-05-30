var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbConfig = require('../config/dbConfig.js');

var dbM = {
		conexao : function(){
			var db = new Db(dbConfig.banco, new Server(dbConfig.url , dbConfig.port));	
			console.log(dbConfig.banco);
			console.log(dbConfig.url);
			console.log(dbConfig.port);		
			return db;
		}
	}

module.exports = dbM;

