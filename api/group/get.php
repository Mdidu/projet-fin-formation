<?php
require_once 'configGroup.php';

$group = new Group();

$data = $group->getGroup($_GET['id']);

$json = json_encode($data);
echo $json;
return $json;
