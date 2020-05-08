<?php
require_once __DIR__.'/../config/configCommentary.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['content'])) && !empty(isset($data['id']))) {
  $commentary = new Commentary();
  $commentary->updateCommentary($data['content'], $data['id']);
}
