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
$sql="DELETE FROM `Performance` WHERE `Date_time`=$time";
$conn->query($sql);
$sql="DELETE FROM `Program_performed` WHERE `Date_time`=$time";
$conn->query($sql);
$sql="DELETE FROM `Performer` WHERE `Date_time`=$time";
$conn->query($sql);
$sql="DELETE FROM `Orchestra` WHERE `Date_time`=$time";
$conn->query($sql);
$sql="DELETE FROM `Staff` WHERE `Date_time`=$time";
$conn->query($sql);

$conn->close();
?>