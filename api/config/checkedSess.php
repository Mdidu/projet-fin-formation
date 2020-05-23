<?php
session_start();

$cookie_name = "version";

$ticket = session_id().microtime().rand(0, 999999999999999999999);
$ticket = hash("sha512", $ticket);
//$_SESSION['ticket'] = $ticket;
//var_dump($_SESSION['ticket']);
