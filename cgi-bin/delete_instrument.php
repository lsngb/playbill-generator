<?php
session_start();
$servername = "localhost";
$username = "messyxin_nycos";
$password = "playbill";
$dbname = "messyxin_nycos";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
}

$time="'".$_SESSION["time"]."'";
$I_Name_CN="'".$_REQUEST["instrument"]."'";

$sql="DELETE FROM `Orchestra` WHERE `Date_time`=$time AND `Name_CN`= $I_Name_CN";
$conn->query("SET NAMES utf8"); 
$conn->query($sql);

$conn->close();
?>