  var url = '../backend/youtube.php';
  
  function mostrarAddMusicas(){
    $(".add-musicas").toggle("fast");  
  }
function mostrarExcluir(){

var elemento = document.getElementById('bt-ex'+'0');
console.log(elemento.classList)
if(elemento.classList.contains('esconder')){
  
  $(".btn-excluir").removeClass('esconder');
  
  $("html, body").animate( 
    { scrollTop: "200" }, 700);
    
}else {
  
  $(".btn-excluir").addClass('esconder');
       
  }
}
function tocar(id){

  var bt = document.getElementById(id);
  if (bt.paused) {
    bt.play();
    $("#bt"+id).html('Pause');
  } else {
    bt.pause();
    $("#bt"+id).html('Play');
  }
}

function init(){
  $.post(url,{funcao: 'listar'}, function(response){

    var retorno = jQuery.parseJSON(response);
    var card;

          if (retorno.length>0) {
            retorno.forEach( function(element, index) {

             if (index == 0) {
                   card = '<div class="col-sm-4"><a onclick="tocar('+index+')"><div class="card" style="width: auto">'+
                  // '<img class="card-img-top" src="../imagens/5.JPG" alt="Card image cap">'+
                  element.embed+
                  '<div class="card-body">'+
                    // '<p title="'+element.nome+'">'+element.nomeCurto+'</p>'+
                    
                    '<a class="btn btn-sm btn-excluir esconder" id="bt-ex'+index+'" onclick="excluir('+element.id+')" >Excluir</a></div>'+
                  '</div></a></div>';
             }
             else {
                    card = card + '<div class="col-sm-4"><a onclick="tocar('+index+')"><div class="card" style="width: auto;">'+
                  // '<img class="card-img-top" src="../imagens/5.JPG" alt="Card image cap">'+
                    element.embed+

                  '<div class="card-body">'+
                    // '<p title="'+element.nome+'">'+element.nomeCurto+'</p>'+
                    '<a class="btn btn-sm btn-excluir esconder" id="bt-ex'+index+'" onclick="excluir('+element.id+')">Excluir</a></div>'+
                  '</div></a></div>';
             }

            });
        
        }else {
          card = "<p>Você ainda não incorporou nenhum vídeo do youtube.</p>"
        
      }
    var element = document.getElementById('row-musicas');
    element.innerHTML = card;

  })
}

function excluir(id){
  $.post(url,{funcao: 'excluir', id: id}, function(response, status){
    if (status) {
      Swal.fire(
      'Vídeo Excluído!',
      '',
      'success'
    ).then((result) => {
        document.location.reload(false);

      })
      
    } else {
      Swal.fire(
      'Ops, algo de errado aconteceu.',
      'Tente novamente',
      'error'
    )
    }
  })
}
function ajuda(){
    Swal.fire({
  title: 'Onde eu copio o link correto?',
  text: 'Siga o passo a passo acima para copiar o link do seu vídeo do Youtube.',
  imageUrl: '../imagens/helpcompleto.png',
  imageWidth: 515,
  imageHeight: 1009,
  imageAlt: 'Ajuda',

})
}
function inserir(){
  var embed = $("#embed").val();
if (embed.indexOf('<iframe') !== -1) {
  
  $.post(url, {funcao: 'inserir', embed:embed}, function(response, status){
    if (status) {
      Swal.fire(
      'Vídeo Incorporado!',
      '',
      'success'
    ).then((result) => {
        document.location.reload(false);

      })      
    } 
    else {
      Swal.fire(
      'Ops, algo de errado aconteceu.',
      'Tente novamente',
      'error'
    )
    }
  })

} else {

  ajuda();
}
  
}

$(document).ready(function(){       // ***** Após a página carregar *****

  init();


  


})
