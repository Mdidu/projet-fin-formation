<?php
require_once __DIR__.'/../../config/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['groupId'])) && !empty(isset($data['userId']))) {
  $group = new Group();
  $group->joinGroup($data['groupId'], $data['userId']);
  $group->deleteInvite($data['groupId'], $data['userId']);
}
