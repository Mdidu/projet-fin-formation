<?php 
require_once __DIR__."/../config/configUser.php";

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['email'])) && !empty(isset($data['password']))) {
    $user = new User('');
    $response = $user->updatePassword($data['email'], password_hash($data['password'], PASSWORD_DEFAULT));

    $json = json_encode($response);
    echo $json;
    return $json;
} else {
    $json = json_encode(false);
    echo $json;
    return $json;
}