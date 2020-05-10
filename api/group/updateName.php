<?php
require_once __DIR__.'/../config/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['groupId'])) && !empty(isset($data['content']))) {
  $group = new Group();
  $group->updateName($data['groupId'], $data['content']);
}
