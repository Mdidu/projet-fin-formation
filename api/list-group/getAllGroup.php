<?php
require_once '../group/configGroup.php';

$group = new Group();

$listGroup = $group->searchAllGroup();

$json = json_encode($listGroup);
echo $json;
return $json;
