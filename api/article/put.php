<?php
require_once __DIR__.'/../config/configArticle.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['content'])) && !empty(isset($data['id']))) {
  $article = new Article();
  $article->updateArticle($data['content'], $data['id']);
}
