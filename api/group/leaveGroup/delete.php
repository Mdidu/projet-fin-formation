<?php
require_once __DIR__.'/../../config/configGroup.php';

//$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($_GET['groupId'])) && !empty(isset($_GET['userId']))) {

  $group = new Group();
  $group->leaveGroup($_GET['groupId'], $_GET['userId']);
}
