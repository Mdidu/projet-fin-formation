<?php
require_once __DIR__.'/../config/configUser.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['pseudo'])) && !empty(isset($data['password'])))
{
  $user = new User($data['pseudo']);
  $response = $user->log($data['password']);

  $json = json_encode($response);
  echo $json;
  return $json;
}
