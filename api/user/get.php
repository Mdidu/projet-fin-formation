<?php
require_once '../config/configUser.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['pseudo'])) && !empty(isset($data['password'])))
{
  $user = new User($data['pseudo']);
  $pseudo = $user->log($data['pseudo'], $data['password']);

  $json = json_encode($pseudo);
  echo $json;
  return $json;
}

//$pseudo = $_SESSION['pseudo'];
//$data = json_encode($pseudo);
//echo $data;
//return $data;

//$data = json_encode($data['pseudo']);
//echo $data;
//return $data;