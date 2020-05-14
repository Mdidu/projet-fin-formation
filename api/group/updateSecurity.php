<?php
require_once __DIR__.'/../config/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['groupId'])) && !empty(isset($data['security']))) {
  $group = new Group();
  $group->updateSecurity($data['groupId'], $data['security']);
}
