<?php
header("Access-Control-Allow-Origin: *"); // Substitua pelo URL da sua aplicação Angular
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $novoCsv =   file_get_contents('php://input');
    $filePath = __DIR__ . "/csv/pagamentos.CSV";
    
    // Tenta escrever o conteúdo no arquivo CSV
    if (file_put_contents($filePath, $novoCsv) !== false) {
        $response = array("method" => 'POST', "data" => "deu certo man!");
    } else {
        $response = array("method" => 'POST', "error" => "Falha ao escrever no arquivo CSV.");
    }
    
    // Retorna a resposta como JSON
    echo json_encode($response);

        
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Processa os dados recebidos via GET
    $senha = file_get_contents("csv/pagamentos.CSV");
    $data = $_GET;
    $response = array(
        'method' => 'GET',
        'data' => $senha
    );
    echo json_encode($response);
} else {
    // Se o método não for nem POST nem GET
    $response = array(
        'error' => 'Método não suportado'
    );
    echo json_encode($response);
}
// Retorna a resposta como JSON
