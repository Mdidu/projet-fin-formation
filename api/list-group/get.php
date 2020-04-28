<?php
require_once '../group/configGroup.php';

$data = json_decode(file_get_contents("php://input"), true);

$group = new Group();
$listGroup = $group->searchAllGroup($data);

$t = json_encode($listGroup);
echo $t;
return $t;
