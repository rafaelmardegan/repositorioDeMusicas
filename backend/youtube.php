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
			$sql = mysqli_query($conexao, "SELECT * from youtube");
			$musicas = "";
			if ($sql != null || $sql != "") {
				$musicas = array();

				while ($dados = mysqli_fetch_array($sql) ) {

				    $musica = array(
				    	'id' => $dados['id'],
				    	'embed' => $dados['embed']

				    );
				    array_push($musicas, $musica);
				}
				
			} 
			echo json_encode($musicas);
		break;
		
		case "excluir":
			$id = $_POST['id'];
			
			$sql = mysqli_query($conexao, "DELETE from youtube WHERE id = $id");

			break;

		case "inserir":
			$embed = $_POST['embed'];
			mysqli_query($conexao, "INSERT INTO youtube (embed)
									VALUES ('$embed')");
			echo "true";
		break;
	}
}else{
	echo "Conexão não autorizada.";
}



function contem($var, $ponto){

	return strpos($var, $ponto) !== false;
}



 ?>