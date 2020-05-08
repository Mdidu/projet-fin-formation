<?php
require_once __DIR__.'/../config/configGroup.php';

if(!empty(isset($_GET['id']))){
  $group = new Group();
  $data = $group->getMembers($_GET['id']);

  $json = json_encode($data);
  echo $json;
  return $json;
}
