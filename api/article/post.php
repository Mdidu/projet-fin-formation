<?php
require_once '../config/configArticle.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!empty(isset($data['content'])) && !empty(isset($data['groupId'])) && !empty(isset($data['userId']))){
  $article = new Article();
  $article->addArticles($data['content'], $data['groupId'], $data['userId']);

//  $json = json_encode($data);
//  echo $json;
//  return $json;
}

