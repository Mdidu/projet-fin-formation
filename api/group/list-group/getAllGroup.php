<?php
require_once __DIR__.'/../../config/configGroup.php';

$group = new Group();

$listGroup = $group->searchAllGroup();

$json = json_encode($listGroup);
echo $json;
return $json;

