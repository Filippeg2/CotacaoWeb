var fs = require('fs');


var log = {

		logar : function(arq, value, path){

			var arquivo = arq == 'undefined' || arq == null ? arquivo = 'log.log' : arquivo = arq + '.log';
			var temp = value instanceof Date ? '\r\n#' +  formataDiaEMes(value) + '#' : value + '\r\n';   
    		var local_path = path == 'undefined'|| path == null ? local_path = '../log/' : local_path = path;
      
			fs.appendFile(local_path + arquivo, temp, function(err){
  				if (err){     
                console.log('erro ao salvar log ' + err);
                }
  			});
        
		}

}

function formataDiaEMes(val){
  
	var dia = val.getDate().toString().length == 1 ? '0' + val.getDate() : val.getDate();
	var mes = val.getMonth().toString().length == 1 ? '0' + val.getMonth() : val.getMonth();
	var ano = val.getFullYear()
	var hora = val.getHours().toString().length == 1 ? '0' + val.getHours() : val.getHours(); 
	var minuto = val.getMinutes().toString().length == 1 ? '0' + val.getMinutes() : val.getMinutes(); 
	var segundo = val.getSeconds().toString().length == 1 ? '0' + val.getSeconds() : val.getSeconds(); 
	return dia+'/'+mes+'/'+ano+'T'+hora+':'+minuto+':'+segundo;
}



module.exports = log;