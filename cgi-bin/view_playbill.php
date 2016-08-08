<?php
session_start();
$_SESSION["time"]=$_REQUEST["time"];

echo $_SESSION["time"];

?>