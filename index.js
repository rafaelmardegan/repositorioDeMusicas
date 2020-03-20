  var url = 'backend/index.php';
  
  function mostrarAddMusicas(){
    $(".add-musicas").toggle("fast");  
  }
function mostrarExcluir(){

var elemento = document.getElementById('bt-ex'+'0');
console.log(elemento.classList)
if(elemento.classList.contains('esconder')){
  $(".btn-excluir").removeClass('esconder');
    
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
                  '<img class="card-img-top" src="imagens/5.JPG" alt="Card image cap">'+
                  '<div class="card-body">'+
                    '<p title="'+element.nome+'">'+element.nomeCurto+'</p>'+
                    '<audio id="'+index+'" controls  src="'+element.diretorio+element.nomeArquivo+'" ></audio><br>'+
                    '<a class="btn btn-sm btn-excluir esconder" id="bt-ex'+index+'" onclick="excluir('+element.id+')" >Excluir</a></div>'+
                  '</div></a></div>';
             }
             else {
                    card = card + '<div class="col-sm-4"><a onclick="tocar('+index+')"><div class="card" style="width: auto;">'+
                  '<img class="card-img-top" src="imagens/5.JPG" alt="Card image cap">'+
                  '<div class="card-body">'+
                    '<p title="'+element.nome+'">'+element.nomeCurto+'</p>'+
                    '<audio id="'+index+'" controls  src="'+element.diretorio+element.nomeArquivo+'" ></audio><br>'+
                    '<a class="btn btn-sm btn-excluir esconder" id="bt-ex'+index+'" onclick="excluir('+element.id+')">Excluir</a></div>'+
                  '</div></a></div>';
             }

            });
        
        }else {
          card = "<p>Você ainda não inseriu nenhuma música.</p>"
        
      }
    var element = document.getElementById('row-musicas');
    element.innerHTML = card;

  })
}

function excluir(id){
  $.post(url,{funcao: 'excluir', id: id}, function(response, status){
    if (status) {
      Swal.fire(
      'Música Excluída!',
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

$(document).ready(function(){       // ***** Após a página carregar *****

  init();
      var uppy = Uppy.Core({
        debug: true,
        autoProceed: false,
        restrictions: {
          maxNumberOfFiles: 5,
          maxFileSize: 10000000,
          allowedFileTypes: ['audio/*', '.mp4', 'application/octet-stream']
        }
      })
      .use(Uppy.Dashboard, {
        inline: true,
        target: '#drag-drop-area',
        width: 900,
        height:300,
        allowMultipleUploads :  true ,
        locale: Uppy.locales.pt_BR

      })
      .use(Uppy.XHRUpload, {endpoint: url,  fieldName: 'my_file'})

      uppy.on('complete', (result) => {
        // console.log('Upload complete! We’ve uploaded these files:', result.successful[0].response.body);
        // console.log('Upload complete! We’ve uploaded these files:', result.successful);

        Swal.fire(
        'Sucesso!',
        'Suas músicas foram adicionadas.',
        'success'
      ).then((result) => {
        document.location.reload(false);

      })
      })  


})
