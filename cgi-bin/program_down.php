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
$input=$_REQUEST["input"];
$temp=explode("|",$input);

for ($i=0; $i < 5; $i++) { 
	if ($temp[$i]!="x") {
		$temp[$i]=(int)($temp[$i]);
	}
}

if ($temp[3]=="x") {
	//last already
}
elseif ($temp[4]=="x") {
	//current second to last
	$sql="SELECT * FROM `Program_performed` WHERE `PID`=$temp[3] AND `Date_time`=$time";
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$Order=$row["Order"]-10;
	$sql="UPDATE `Program_performed` SET `Order`= $Order WHERE `PID`=$temp[2] AND `Date_time`=$time";
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);
}
else{
	$sql="SELECT * FROM `Program_performed` WHERE `PID`=$temp[4] AND `Date_time`=$time";
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$Order=$row["Order"];
	$sql="SELECT * FROM `Program_performed` WHERE `PID`=$temp[3] AND `Date_time`=$time";
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$Order=($Order+$row["Order"])/2;
	$sql="UPDATE `Program_performed` SET `Order`= $Order WHERE `PID`=$temp[2] AND `Date_time`=$time";
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);
}
$conn->close();
?>