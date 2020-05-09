<?php
require_once __DIR__.'/../../config/configGroup.php';

if(!empty(isset($_GET['groupId']))) {
  $group = new Group();
  $response = $group->getApply($_GET['groupId']);

  $json = json_encode($response);
  echo $json;
  return $json;
}
