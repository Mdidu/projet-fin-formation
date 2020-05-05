<?php

require_once '../config/configUser.php';

// permet de retourner le json
//$json = file_get_contents('php://input');
//$t = json_encode($json);
//echo $t;
//return $t;

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
