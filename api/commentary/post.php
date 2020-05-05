<?php
require_once '../config/configCommentary.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['content'])) && !empty(isset($data['articleId'])) && !empty(isset($data['userId']))){
  $commentary = new Commentary();
  $commentary->addCommentary($data['content'], $data['articleId'], $data['userId']);
}
