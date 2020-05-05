<?php
require_once '../config/configCommentary.php';

if(!empty(isset($_GET['id']))){
  $commentary = new Commentary();
  $commentary->removeCommentary($_GET['id']);
}
