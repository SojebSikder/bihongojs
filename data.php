<?php 
$data = array();


$data[] = array(
    "name" => "sojeb",
    "title" => "Programmer",
    "command" => $_REQUEST['username']
);

echo json_encode($data);
?>