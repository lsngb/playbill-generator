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

$Name_CN="'".$_REQUEST["CN_Name"]."'";
$Part_CN="'".$_REQUEST["CN_Part"]."'";

//Get PID from Program
$sql = "SELECT ID FROM Program where Part_CN=$Part_CN and Name_CN= $Name_CN";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$PID=(int)$row['ID'];

//delete Program_performed at delete time
$sql="DELETE FROM `Program_performed` WHERE `Date_time`=$time and `PID`=$PID";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

$conn->close();
?>