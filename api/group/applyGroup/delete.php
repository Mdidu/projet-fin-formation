<?php
require_once __DIR__.'/../../config/configGroup.php';

if(!empty(isset($_GET['groupId'])) && !empty(isset($_GET['userId']))) {
  $group = new Group();
  $group->deleteApply($_GET['groupId'], $_GET['userId']);
}
