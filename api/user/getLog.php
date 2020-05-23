<?php
require_once __DIR__."/../config/configUser.php";

if(!empty(isset($_GET['id'])) && !empty(isset($_GET['egt']))) {
  $user = new User('');
  $response = $user->checkedToken($_GET['id'], $_GET['egt']);

  $json = json_encode($response);
  echo $json;
  return $json;
}

