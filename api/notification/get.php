<?php
require_once __DIR__.'/../config/configNotification.php';

if(!empty(isset($_GET['userId']))) {
  $notif = new Notification();

  $response = $notif->getNotification($_GET['userId']);

  $json = json_encode($response);
  echo $json;
  return $json;
}
