
var MongoClient = require('mongodb').MongoClient
var request = require('request');
var dbModule = require('../commons/db.js');
var log = require('../commons/log.js');
var dbConfig = require('../config/dbConfig.js');
var fs = require('fs');
console.log('Executando schedule');
setInterval(function(){


var datetime = new Date(); 
//var dia = datetime.getDate();
var dia = (datetime.getDate()).toString().length == '1' ? '0' + (datetime.getDate()) : datetime.getDate();
var mes = (datetime.getMonth()).toString().length == '1' ? '0' + (datetime.getMonth() + 1) : datetime.getMonth();
var ano = datetime.getFullYear();

var dataCompleta = dia + '/' + mes + '/' + ano;
log.logar('serviceCotacao', new Date);


//dia = dia.toString().length == 2 ? '0' + (dia - 1) : dia - 1;

var url = 'http://www4.bcb.gov.br/Download/fechamento/' + ano + mes + dia + '.csv';
console.log(url);

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
		
		console.log(response.statusCode);	
		var obj = criarObj(body, dataCompleta);
		console.log(obj);
		log.logar('serviceCotacao','Acessou o servico da receita');
		//MongoClient.connect('mongodb://127.0.0.1:27017/dadosCotacao', function(err, db) {
		/*MongoClient.connect('mongodb://' + dbConfig.url + ':' + dbConfig.port + '/' + dbConfig.collectionName.dbNameCot, function(err, db) {

			if(err) throw err;

			console.log('conexao aberta');
			db.collection(dbConfig.collectionName.dbNameCot).save(obj, {w:1}, function(){
					console.log('item adicionado');
					db.close(function(){
						console.log('conexao encerrada');
					});
			});
			
		});*/
		
		var db = dbModule.conexao();
		db.open(function(err){
			if(err) {
				log.logar('Erro ao acessar o banco de dados' + err + ',');
        		console.log('Erro ao acessar o banco de dados');
			}
			else{
				console.log('conexao aberta');
				log.logar('serviceCotacao','conexao aberta,');
				db.collection(dbConfig.collectionName.dbNameCot).save(obj, {w:1}, function(){
					console.log('item adicionado');
					log.logar('serviceCotacao','item adicionado,');
					db.close(function(){
						console.log('conexao encerrada');
						log.logar('serviceCotacao','conexao encerrada,');
					});
			});
		  }
		});
  }
  else{
	console.log(error);
	console.log('Nao existe documentos de hoje');
	log.logar('serviceCotacao','ocorreu um erro ao acessar o servico da receita - ' + error + ',');
	console.log(response.statusCode);	
  }

});
console.log('Executando schedule');

}, 3000);
//3600000  1 hora
//10800000 3 horas
//18000000 5 horas
//43200000 12 horas
//86400000 24 horas


function criarObj(content, dataCompleta){
	var doc = "";
	var json = "";
	json = '{';	
		
	doc = content;
	doc = doc.split('\r\n');
	var linha = "";
	
	
	for(var x = 0; x <= doc.length - 1; x++){
		
		linha = doc[x];				
		linha = linha.split(';');

		if(linha[3] == 'USD'){
			json += '"dolar" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';		
			continue;
		}
		if(linha[3] == 'AUD'){
			json += '"dolarAustraliano" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';
			continue;
		}
		if(linha[3] == 'CAD'){
			json += '"dolarCanadense" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';
			continue;
		}
		if(linha[3] == 'EUR'){
			json += '"euro" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';		
			continue;
		}
		if(linha[3] == 'GBP'){
			json += '"libra" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';	
			continue;
		}
		if(linha[3] == 'CHF'){
			json += '"francoSuico" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';	
			continue;
		}
		if(linha[3] == 'ARS'){
			json += '"pesoArgentino" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';
			continue;
		}
		if(linha[3] == 'CLP'){
			json += '"pesoChileno" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';
			continue;
		}
		if(linha[3] == 'JPY'){
			json += '"iene" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';
			continue;
		}
		if(linha[3] == 'DKK'){
			json += '"coroaDinamarquesa" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';
			continue;
		}
		if(linha[3] == 'NOK'){
			json += '"coroaNorueguesa" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';
			continue;
		}
		if(linha[3] == 'CNY'){
			json += '"renminbi" : { "venda" : "' + replaced(linha[5]) + '",';
			json += '"compra" : "' + replaced(linha[4]) + '"},';
			continue;
		}
		
		
	}
	
	json += '"ultimaDataEncontrada" : "' + dataCompleta + '"';
	json += '}';
	var jconvert = JSON.parse(json);
	return jconvert;

}


function replaced(e){

	var temp = e;
	temp = temp.replace(',', '.');
	return temp;
}

