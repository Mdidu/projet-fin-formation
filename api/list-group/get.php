<?php
require_once '../config/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);
if(empty(isset($data))) {
  $group = new Group();
  $listGroup = $group->searchAllGroupCurrentUser($data);
  $listGroup['date'] = date($listGroup['date']);

  $json = json_encode($listGroup);
  echo $json;
  return $json;
}

