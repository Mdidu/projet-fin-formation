<?php
require_once '../config/configCommentary.php';

if(!empty(isset($_GET['id']))){
  $commentary = new Commentary();
  $data = $commentary->searchAllCommentary($_GET['id']);

  $json = json_encode($data);
  echo $json;
  return $json;
}
