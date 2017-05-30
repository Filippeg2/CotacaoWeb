var dbModule = require('../commons/db.js');
var dbConfig = require('../config/dbConfig.js');
var log = require('../commons/log.js');
exports.recuperaCotacao = function(req, res){

    var db = dbModule.conexao();

    db.open(function(err){
        if(err){
            //log.logar('app', 'Erro inesperado', './log/');
            res.status(500);
            res.end('NOK - Erro inesperado tente novamente mais tarde');
      }
      else{

        console.log('Conexao com o banco aberta...');
        //log.logar('app', 'Conexao com o banco aberta...', './log/');
        var data =  new Date();

        var dia = data.getDate();
        dia = (dia < 10 ? "0" : "") + dia;

        var hora = data.getHours();
        hora = (hora < 10 ? "0" : "") + hora;

        var minutos = data.getMinutes();
        minutos = (minutos < 10 ? "0" : "") + minutos;

        var segundos = data.getMinutes();
        segundos = (segundos < 10 ? "0" : "") + segundos;

        var data_hora_formatada = data.getFullYear() + '-' + 
                                  data.getMonth() + 1 + '-' + 
                                  dia + 'T' + 
                                  hora + ':' +
                                  minutos + ':' +
                                  segundos;

        var ipDeAcesso = (/\d+.*/.exec(req.connection.remoteAddress))[0];

        db.collection(dbConfig.collectionName.dbNameIP).save({"ip_access" :  ipDeAcesso, "date_access" : data_hora_formatada }, {w:1}, function(){
            console.log('IP ' + ipDeAcesso + ' adicionado');
            //log.logar('app', 'IP ' + ipDeAcesso + ' adicionado', './log/');
        });

        db.collection(dbConfig.collectionName.dbNameCot).find().toArray(function(err, result) {
              var obj = result[result.length - 1];
              res.status(200);
              res.end(JSON.stringify(obj));
              db.close(function(){
                 console.log('Conexao com o banco encerrada...');
                 //log.logar('app', 'Conexao com o banco encerrada...', './log/');
              });
        });

    }
    });
}

