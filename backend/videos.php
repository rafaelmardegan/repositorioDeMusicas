<?php 

// $a = $_FILES['files'];

  $DB_host="localhost:3306";
  $DB_login="root";
  $DB_pass="fernandobaterias5";
  $DB_db="flauta";


  // $DB_host="fdb25"; 
  // $DB_login="3254767_flauta";
  // $DB_pass="flaut@s89";
  // $DB_db="3254767_flauta";
  
//php 7
 $conexao = "";
 $conexao = mysqli_connect($DB_host,$DB_login ,$DB_pass);
 $x = mysqli_select_db($conexao, $DB_db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	$funcao = "";
	$funcao = $_POST['funcao'];

	switch ($funcao) {
		case "listar":
			$sql = mysqli_query($conexao, "SELECT * from videos order by id desc");
			$musicas = "";
			if ($sql != null || $sql != "") {
				$musicas = array();

				while ($dados = mysqli_fetch_array($sql) ) {
					$nomeCurto = $dados['nome'];
					if (strlen($nomeCurto)>26) {
						$nomeCurto = substr($nomeCurto, 0, 26)."...";
								}
				    $musica = array(
				    	'id' => $dados['id'],
				    	'nome' => $dados['nome'],
				    	'nomeCurto' => $nomeCurto,
				    	'nomeArquivo' => $dados['nomeArquivo'],
				    	'diretorio' => $dados['diretorio']
				    );
				    array_push($musicas, $musica);
				}
				
			} 
			echo json_encode($musicas);
		break;
		
		case "excluir":
			$id = $_POST['id'];
			$arq = mysqli_query($conexao, "SELECT nomeArquivo from videos WHERE id = $id");
			$arq = mysqli_fetch_array($arq);
			unlink("../arquivos/videos/".$arq['nomeArquivo']);
			
			$sql = mysqli_query($conexao, "DELETE from videos WHERE id = $id");

			break;

		default:

			$my_file = $_FILES['my_file'];
			$file_path = $my_file['tmp_name']; // nome do arquivo temporário do php
			$extensao = ".mp4";
			$file_name = $_POST['name']; // nome do arquivo
			$tipo = $_POST['type'];
			$novo_nome = md5(time()).mt_rand(5, 100).".mp4";
			$diretorio = "../arquivos/videos/";

			if (!contem($file_name, ".")) {
				$file_name = $file_name.$extensao;
			}

			move_uploaded_file($file_path, $diretorio . basename($novo_nome)); 

			$response = json_encode("raspa de grilo mocho ");
			echo $response;

			mysqli_query($conexao, "INSERT INTO videos (nome, nomeArquivo, diretorio)
									VALUES ('$file_name', '$novo_nome', '$diretorio')");

		break;
	}
}else{
	// nao é post
}



function contem($var, $ponto){

	return strpos($var, $ponto) !== false;
}



 ?>