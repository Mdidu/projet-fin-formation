<?php
require_once '../config/configUser.php';

if(!empty(isset($_GET['pseudo']))){
  $user = new User($_GET['pseudo']);
  $user->logout();

  $json = json_encode($_GET['pseudo']);
  echo $json;
  return $json;
}
