<?php

require_once '../config/configUser.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['pseudo'])) && !empty(isset($data['password'])) &&
  !empty(isset($data['checkedPassword'])) && ($data['password'] == $data['checkedPassword']))
{
  $user = new User($data['pseudo']);
  $response = $user->addUser(password_hash($data['password'], PASSWORD_DEFAULT));

  if($response === false){
    $json = json_encode(true);
    echo $json;
    return $json;
  }
} else {
  $json = json_encode(false);
  echo $json;
  return $json;
}
