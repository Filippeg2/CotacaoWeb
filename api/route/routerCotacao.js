var controllerCotacao = require('../controller/ControllerCotacao.js');
var log = require('../commons/log.js');

module.exports = function(router){			
	//log.logar('app', 'Iiniciou a Rota', './log/');
	router.route('/cotacao').get(controllerCotacao.recuperaCotacao);
	
}