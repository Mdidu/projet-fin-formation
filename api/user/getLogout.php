<?php
require_once __DIR__.'/../config/configUser.php';

if(!empty(isset($_GET['pseudo']))){
  $user = new User($_GET['pseudo']);
  $user->logout();
}
