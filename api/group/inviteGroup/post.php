<?php
require_once __DIR__.'/../../config/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['pseudo'])) && !empty(isset($data['groupId']))) {

  $user = new User($data['pseudo']);
  $id = $user->searchUserId();

  if($id !== NULL) {
    $group = new Group();
    $response = $group->addInviteGroup($data['groupId'], $id);

    return $response;
  } else {
    return false;
  }
} else {
  return false;
}
