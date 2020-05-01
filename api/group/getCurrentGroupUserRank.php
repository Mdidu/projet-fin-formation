<?php
require_once '../config/configGroup.php';

if(!empty(isset($_GET['id'])) && !empty(isset($_GET['groupId']))){
  $group = new Group();
  $data = $group->getCurrentGroupUserRank($_GET['groupId'], $_GET['id']);

  $json = json_encode(intval($data['rank_id']));
  echo $json;
  return $json;
}
