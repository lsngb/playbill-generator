<?php
session_start();
$input=$_REQUEST["input"];
$time="'".$_REQUEST["time"]."'";
$temp="loggedin".str_replace(" ","_",$time);
if ($input=="") {
	if (isset($_SESSION[$temp]) && $_SESSION[$temp] == true) {
		echo 1;
	}
	else {echo 0;}
}

else{
	$input="'".$input."'";
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
	$sql ="SELECT * FROM `Performance` WHERE `Password` = $input and `Date_time`=$time";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		$_SESSION[$temp] = true;
		echo 1;
	}
	else {
		echo 2;
	}
}
?>