<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');

session_start();

require_once '../trait/Db.php';
require_once '../class/User.php';
require_once '../class/Group.php';
