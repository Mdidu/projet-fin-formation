<?php

require_once __DIR__.'/../config/configUser.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['pseudo'])) && !empty(isset($data['email'])) && !empty(isset($data['password'])) &&
  !empty(isset($data['checkedPassword'])) && ($data['password'] === $data['checkedPassword']))
{
  $user = new User($data['pseudo']);
  $user->createToken();
  $response = $user->addUser($data['email'] , password_hash($data['password'], PASSWORD_DEFAULT));


  mail($data['email'], "Mail de validation, ManGroup",
    'Afin de valider votre inscription, merci de clicker sur le lien ci-dessous:
    https://www.ameddas.ovh/#/auth/'.$data['pseudo'].'/'.$user->getToken());

  // if user not create : return true for indicate that username is already in use !
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
