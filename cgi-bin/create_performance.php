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

$_SESSION["datetime"] = $_REQUEST["time"];
$_SESSION["order"] = 0;


$time='"'.$_REQUEST["time"].'"';
$name='"'.$_REQUEST["name"].'"';
$name_CN='"'.$_REQUEST["name_CN"].'"';
$address='"'.$_REQUEST["address"].'"';
$remark='"'.$_REQUEST["remark"].'"';
$password ='"'. $_REQUEST["password"].'"';

$sql = "INSERT INTO `Performance`(`Date_time`, `Location`, `Password`, `Poster`, `Playbill`) VALUES ($time,$name,$password,null,null)";
if ($conn->query($sql) === TRUE) {
    //echo "New record created successfully";
} else {
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql = "SELECT * FROM Location where Name=".$name;
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$sql_location="UPDATE `Location` SET `Name_CN`=$name_CN,`Address`=$address,`Remark`=$remark WHERE Name=".$name;
	$conn->query($sql_location);
} else {
	$sql_location="INSERT INTO `Location`(`Name`, `Name_CN`, `Address`, `Remark`) VALUES ($name,$name_CN,$address,$remark)";
	$conn->query($sql_location);
}
$conn->close();
?>