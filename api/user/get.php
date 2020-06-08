<?php
require_once __DIR__.'/../config/configUser.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['email'])) && !empty(isset($data['password'])))
{
  $user = new User('');
  $response = $user->log($data['email'], $data['password']);

  $json = json_encode($response);
  echo $json;
  return $json;
}
