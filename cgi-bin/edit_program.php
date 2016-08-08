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
$Name_CN="'".$_REQUEST["CN_Name"]."'";
$Name="'".$_REQUEST["Name"]."'";
$Part_CN="'".$_REQUEST["CN_Part"]."'";
$Part="'".$_REQUEST["Part"]."'";
$Program_type="'".$_REQUEST["Program_type"]."'";
$Synopsis_CN="'".$_REQUEST["CN_Synopsis"]."'";
$Synopsis="'".$_REQUEST["Synopsis"]."'";

//insert or update Program info
$sql = "SELECT * FROM Program where Part_CN=$Part_CN and Name_CN=$Name_CN and Program_type=$Program_type";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$sql_location="UPDATE `Program` SET `Name`=$Name,`Part`=$Part,`Synopsis_CN`=$Synopsis_CN ,`Synopsis`=$Synopsis WHERE Part_CN=$Part_CN and Name_CN=$Name_CN";
	$conn->query($sql_location);

} else {
	$sql_location="INSERT INTO `Program`(`Name`, `Name_CN`, `Part`, `Part_CN`, `Synopsis`, `Synopsis_CN`, `Program_type`) VALUES ($Name,$Name_CN,$Part,$Part_CN,$Synopsis,$Synopsis_CN,$Program_type)";
	$conn->query($sql_location);
}

$conn->close();
?>