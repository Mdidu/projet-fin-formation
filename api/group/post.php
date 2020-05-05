<?php
require_once '../config/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['name'])) && !empty(isset($data['descriptionGroup'])) &&
  !empty(isset($data['security'])) && !empty(isset($data['visibility'])) && !empty(!is_int(isset($data['id'])))) {

  $group = new Group();
  $response = $group->addGroup($data['name'], $data['descriptionGroup'], $data['security'], $data['visibility'], $data['id']);

  $json = json_encode($response);
  echo $json;
  return $json;
}
