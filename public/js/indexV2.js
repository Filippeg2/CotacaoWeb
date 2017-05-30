var control = true;

var obj = "";


//Ambos fazem o replaceAll, porem o prototype eu consigo usar como uma evento do String
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
/*
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}*/

//Para formatar unidades monetarias
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };



$(document).ready(function(){
             
  
	       $.ajax({
                    type: 'GET',                        
                    //url: 'http://107.180.106.59:80/api/cotacao',                  
                    //url: 'http://moedahoje.com.br/api/cotacao',       
                    url: 'http://localhost:3000/api/cotacao',                 
                    dataType: "html",                        
                    crossDomain: true,   				
        				    cache: false,
        				    timeout: 10000,
        				    success: function(data){

        				           obj = JSON.parse(data);		
        				           $("#att").text(obj.ultimaDataEncontrada);

                           //DOLAR
                           $("#dolar-compra").val(parseFloat(obj.dolar.compra).formatMoney(4,',','.'));
                           $("#dolar-venda").val(parseFloat(obj.dolar.venda).formatMoney(4,',','.'));
                           var realxdolar = parseFloat(1 / obj.dolar.compra).formatMoney(4,',','.');                           
                           $("#dolar-valor").val("1US$ = " + (parseFloat(obj.dolar.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxdolar + "US$");

                           //EURO
                           $("#euro-compra").val(parseFloat(obj.euro.compra).formatMoney(4,',','.'));
                           $("#euro-venda").val(parseFloat(obj.euro.venda).formatMoney(4,',','.'));
                           var realxeuro = parseFloat(1 / obj.euro.compra).formatMoney(4,',','.');
                           $("#euro-valor").val("1€ = " + (parseFloat(obj.euro.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxeuro + "€");

                           //LIBRA                         
                           $("#libra-compra").val(parseFloat(obj.libra.compra).formatMoney(4,',','.'));
                           $("#libra-venda").val(parseFloat(obj.libra.venda).formatMoney(4,',','.'));
                           var realxlibra = parseFloat(1 / obj.libra.compra).formatMoney(4,',','.');
                           $("#libra-valor").val("1£ = " + (parseFloat(obj.libra.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxlibra + "£");

                           //FRANCO SUICO
                           $("#fSuico-compra").val(parseFloat(obj.francoSuico.compra).formatMoney(4,',','.'));
                           $("#fSuico-venda").val(parseFloat(obj.francoSuico.venda).formatMoney(4,',','.'));
                           var realxfrancoSuico = parseFloat(1 / obj.francoSuico.compra).formatMoney(4,',','.');
                           $("#fSuico-valor").val("1$ = " + (parseFloat(obj.francoSuico.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxfrancoSuico + "$");

                            //DOLAR CANADENSE
                           $("#dolarCad-compra").val(parseFloat(obj.dolarCanadense.compra).formatMoney(4,',','.'));
                           $("#dolarCad-venda").val(parseFloat(obj.dolarCanadense.venda).formatMoney(4,',','.'));
                           var realxcoroaDinamarquesa = parseFloat(1 / obj.dolarCanadense.compra).formatMoney(4,',','.');
                           $("#dolarCad-valor").val("1$ = " + (parseFloat(obj.dolarCanadense.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxcoroaDinamarquesa + "$");


                            //DOLAR AUSTRALIANO
                           $("#dolarAus-compra").val(parseFloat(obj.dolarAustraliano.compra).formatMoney(4,',','.'));
                           $("#dolarAus-venda").val(parseFloat(obj.dolarAustraliano.venda).formatMoney(4,',','.'));
                           var realxcoroaDinamarquesa = parseFloat(1 / obj.dolarAustraliano.compra).formatMoney(4,',','.');
                           $("#dolarAus-valor").val("1$ = " + (parseFloat(obj.dolarAustraliano.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxcoroaDinamarquesa + "$");

                           //COROA DINAMARQUESA
                           $("#cDinamarquesa-compra").val(parseFloat(obj.coroaDinamarquesa.compra).formatMoney(4,',','.'));
                           $("#cDinamarquesa-venda").val(parseFloat(obj.coroaDinamarquesa.venda).formatMoney(4,',','.'));
                           var realxcoroaDinamarquesa = parseFloat(1 / obj.coroaDinamarquesa.compra).formatMoney(4,',','.');
                           $("#cDinamarquesa-valor").val("1$ = " + (parseFloat(obj.coroaDinamarquesa.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxcoroaDinamarquesa + "$");


                           //COROA NORUEGUESA
                           $("#cNorueguesa-compra").val(parseFloat(obj.coroaNorueguesa.compra).formatMoney(4,',','.'));
                           $("#cNorueguesa-venda").val(parseFloat(obj.coroaNorueguesa.venda).formatMoney(4,',','.'));
                           var realxcNorueguesa = parseFloat(1 / obj.coroaNorueguesa.compra).formatMoney(4,',','.');
                           $("#cNorueguesa-valor").val("1$ = " + (parseFloat(obj.coroaNorueguesa.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxcoroaDinamarquesa + "$");
                           

                           //PESO AREGENTINO
                           $("#pArgentino-compra").val(parseFloat(obj.pesoArgentino.compra).formatMoney(4,',','.'));
                           $("#pArgentino-venda").val(parseFloat(obj.pesoArgentino.venda).formatMoney(4,',','.'));
                           var realxpArgentino = parseFloat(1 / obj.pesoArgentino.compra).formatMoney(4,',','.');
                           $("#pArgentino-valor").val("1$ = " + (parseFloat(obj.pesoArgentino.compra).formatMoney(4,',','.')) + "R$ / 1R$ = " + realxpArgentino + "$");
                           
                           //PESO CHILENO
                           $("#pChileno-compra").val(parseFloat(obj.pesoChileno.compra).formatMoney(6, ',', '.'));
                           $("#pChileno-venda").val(parseFloat(obj.pesoChileno.venda).formatMoney(6, ',', '.'));
                           var realxpChileno = parseFloat(1 / obj.pesoChileno.compra).formatMoney(6, ',', '.');
                           $("#pChileno-valor").val("1$ = " + (parseFloat(obj.pesoChileno.compra).formatMoney(6, ',', '.')) + "R$ / 1R$ = " + realxpChileno + "$");
                            
                           //IENE
                           $("#iene-compra").val(parseFloat(obj.iene.compra).formatMoney(5, ',','.'));
                           $("#iene-venda").val(parseFloat(obj.iene.venda).formatMoney(5, ',','.'));
                           var realxiene = parseFloat(1 / obj.iene.compra).formatMoney(5, ',','.');
                           $("#iene-valor").val("1$ = " + (parseFloat(obj.iene.compra).formatMoney(5, ',','.')) + "R$ / 1R$ = " + realxiene + "$");

                           //YUAN
                           $("#renminbi-compra").val(parseFloat(obj.renminbi.compra).formatMoney(4,',','.'));
                           $("#renminbi-venda").val(parseFloat(obj.renminbi.venda).formatMoney(4,',','.'));
                           var realxrenminbi = parseFloat(1 / obj.renminbi.compra).formatMoney(4, ',','.');
                           $("#renminbi-valor").val("1$ = " + (parseFloat(obj.renminbi.compra).formatMoney(4, ',','.')) + "R$ / 1R$ = " + realxrenminbi + "$");
                           




        				},
        				error: function(err, textStatus, errorThrown){
        					console.log(textStatus);
        					console.log(errorThrown);
                  control = false;
                  $("#load").remove();
                  $("#content").css("text-align", "center");
                  $("#content").append("<span class='prob'>Ocorreu algum problema!</span>");
        				},
                complete : function(){
                  if(control){
                      $("#load").remove();                 
                      $("#dt_fechamento").show();
                      $( ".divMoeda" ).first().show( "slow", function showNext() {
                         $( this ).next( ".divMoeda" ).show( "fast", showNext );
                      });
                  }
                  preparaSelectModel();
                },
                beforeSend : function(){
                 $("#corpo").append("<div id=\"load\"><div id=\"buscando\">Buscando</div><div id=\"marquee\"><marquee direction='right'>...</marquee></div></div>");
                }
          });	

        
          $('#bt_modal').on('click', function(){
                         
              $( "#convertMoedaModal" ).dialog({
                  open: function(event, ui) {
                         $(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar-close").remove();
                       },
                  title : 'Calculo Cotação', 
                  resizable : false,
                  buttons: [{
                             text: "Close",
                             click: function() {
                                       $( this ).dialog( "close" );
                                    }
                            }]                                              
                }); 

              
            });          


        $('#bt_calc').on('click',function(){
          var multiplicador = $('#moeda_selecioanda').val().replaceAll(',', '.');

         if($("#moeda_selecioanda").val() != ""){

          if(!isNaN(multiplicador)){
            var n1 = $('#select_moeda option:selected').val();
            var n2 = $('#select_moeda2 option:selected').val();
            //var multiplicador = $('#moeda_selecioanda').val().replaceAll(',', '.');
            var result = (n1 / n2) * multiplicador;  
            if($('#select_moeda option:selected').text() == 'Peso Ch'){
              result = parseFloat(result).formatMoney(4, ',', '.'); 
            }    
            else if($('#select_moeda option:selected').text() == 'Iene'){
              result = parseFloat(result).formatMoney(3, ',', '.'); 
            }  
            else{
              result = parseFloat(result).formatMoney(2, ',', '.');  
            }  
           //result = result.toLocaleString("pt-BR", {}); //o toLocaleString por algum motico esta arredondando o valor, deve dar o aprse para int
           // $('#moeda_destino').val(parseFloat(result.toString().substring(0,7)));
           $('#moeda_destino').val(result);
          }
        }
          
        });


     /*   $('#moeda_selecioanda').on('keypress', function(event){

             return validaNumber(event);

        });*/


        $("#invert").on('click', function(){

          var m1 = $('#select_moeda option:selected').index();
          var m2 = $('#select_moeda2 option:selected').index();

          $($('#select_moeda option')[m2]).prop('selected', 'selected');
          $($('#select_moeda2 option')[m1]).prop('selected', 'selected');
          $('#bt_calc').click();
        });

});


function preparaSelectModel(){

    var arrayValores = [];
          var arrayNomes = [];
          var sel1 = $('#select_moeda').children();
          var sel2 = $('#select_moeda2').children();
          var temp = obj;
          delete temp._id;
          delete temp.ultimaDataEncontrada;

           $.map(temp, function(val, i){
              arrayValores.push(val);
              arrayNomes.push(i);
           });

          /* 
          arrayValores.splice(0, 1);
          arrayValores.splice(arrayValores.length -1, 1);  
          arrayNomes.splice(0, 1);
          arrayNomes.splice(arrayNomes.length -1, 1);*/ //remover do array a posicao inicial e quantos depois


           for(var x = 0; x <= arrayValores.length - 1; x++){

              if(arrayNomes[x] == "iene"){
                $(sel1[x]).val(arrayValores[x].compra.toString().substring(0,6));
                $(sel2[x]).val(arrayValores[x].compra.toString().substring(0,6));
              }
              else if(arrayNomes[x] == "pesoChileno")
              {
                $(sel1[x]).val(arrayValores[x].compra);
                $(sel2[x]).val(arrayValores[x].compra);
              }
              else{
                $(sel1[x]).val(arrayValores[x].compra.toString().substring(0,5));
                $(sel2[x]).val(arrayValores[x].compra.toString().substring(0,5));
              }

           }}


function validaNumber(event, str){

  //46 - DELETE
  //190 - . (ponto)
  //8 BACKSPACE

  var valor = event != '' && event != null ? event.keyCode : str.charCodeAt();
   if((valor >= 48 && valor <=57) || valor == 190 || valor == 8 || valor == 46 || (valor >= 37 && valor <= 40)){      
          return true;
          console.log('true');
      }
    else{
         return false;
      }

}