<?php
require_once __DIR__.'/../../config/configUser.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['pseudo'])) && !empty(isset($data['token']))){
  $user = new User($data['pseudo']);
  $response = $user->validateAuth($data['token']);

  $json = json_encode($response);
  echo $json;
  return $json;
} else {
  $json = json_encode(false);
  echo $json;
  return $json;
}
