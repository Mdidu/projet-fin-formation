<?php
require_once __DIR__.'/../../config/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['groupId'])) && !empty(isset($data['userId']))) {
  $group = new Group();
  $response = $group->addApplyGroup($data['groupId'], $data['userId']);

  $json = json_encode($response);
  echo $json;
  return $json;
} else {
  $json = json_encode(false);
  echo $json;
  return $json;
}
// TODO : RESTE a faire pour le système invitation /candidature :
// todo: réception des invitations / acceptation ou rejet des demandes
// todo + notification à l'utilisateur pour les candidatures / Suppression des lignes dans invite (database) si rejet ou accepter
