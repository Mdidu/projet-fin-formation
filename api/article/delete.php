<?php
require_once '../config/configArticle.php';

if(!empty(isset($_GET['id']))){
  $article = new Article();
  /*$data = */$article->removeArticle($_GET['id']);

//  $json = json_encode($data);
//  echo $json;
//  return $json;
}