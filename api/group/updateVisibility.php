<?php
require_once __DIR__.'/../config/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['groupId'])) && !empty(isset($data['visibility']))) {
  $group = new Group();
  $group->updateVisibility($data['groupId'], $data['visibility']);
}
