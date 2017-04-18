<?php
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
$program = $_REQUEST["program"];
$part=$_REQUEST["part"];
//echo json_encode($program."xxx".$part);
$sql = "SELECT * FROM Program where Part_CN='".$part."'and Name_CN='".$program."'";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
        echo json_encode($row["Part"]."|".$row["Program_type"]."|",JSON_UNESCAPED_UNICODE);
    }
} else {
}
$conn->close();
?>