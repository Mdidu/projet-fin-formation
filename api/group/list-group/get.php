<?php
require_once __DIR__.'/../../config/configGroup.php';

//$data = json_decode(file_get_contents("php://input"), true);
if(!empty(isset($_GET['id'])) /*!empty(isset($_SESSION['id']))*/) {
  $group = new Group();
  $listGroup = $group->searchAllGroupCurrentUser($_GET['id']);

  $json = json_encode($listGroup);
  echo $json;
  return $json;
}

