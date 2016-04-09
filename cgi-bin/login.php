<?php
session_start();
$input=$_REQUEST["input"];
if ($input=="") {
	if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
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
	$sql ="SELECT * FROM password where Password = $input";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		$_SESSION['loggedin'] = true;
		echo 2;
	}
	else {
		echo $input;
	}
}

?>