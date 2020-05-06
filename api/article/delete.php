<?php
require_once '../config/configArticle.php';

if(!empty(isset($_GET['id']))){
  $article = new Article();
  $article->removeArticle($_GET['id']);
}
