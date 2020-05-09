<?php
require_once __DIR__.'/../../config/configGroup.php';

if(!empty(isset($_GET['userId']))) {
  $group = new Group();
  $response = $group->getInvite($_GET['userId']);

  $json = json_encode($response);
  echo $json;
  return $json;
}
