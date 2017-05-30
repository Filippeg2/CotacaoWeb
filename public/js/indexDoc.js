$(document).ready(function(){


	var obj = {"dolar": "true", "euro": "true", "iene": "true", "libra" : "true", "francoSuico" : "true", "coroaDinamarquesa" : "true", "coroaNorueguesa" : "true", "coroaSueca" : "true", "dolarAustraliano": "true", "dolarCanadense": "true"};
	
	$("#exemploRequest").append(JSON.stringify(obj, null, 4));


	var objres = {
				  "dolar" 			  : {"venda" : "valor", "compra" : "valor"},
				  "euro" 			  : {"venda" : "valor", "compra" : "valor"},
				  "iene"  			  : {"venda" : "valor", "compra" : "valor"},
				  "libra" 			  : {"venda" : "valor", "compra" : "valor"},	
				  "francoSuico" 	  : {"venda" : "valor", "compra" : "valor"},
				  "coroaDinamarquesa" : {"venda" : "valor", "compra" : "valor"},
				  "coroaNoruequesa"   : {"venda" : "valor", "compra" : "valor"},
				  "coroaSueca" 		  : {"venda" : "valor", "compra" : "valor"},
				  "dolarAutraliano"   : {"venda" : "valor", "compra" : "valor"},
				  "dolarCanadense"	  : {"venda" : "valor", "compra" : "valor"}
				};

	$("#exemploResponse").append(JSON.stringify(objres, null, 4));

});