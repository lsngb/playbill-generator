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
$name = $_REQUEST["name"];
$sql = "SELECT * FROM Location where Name='".$name."'";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
        echo json_encode($row["Name_CN"].'|'.$row["Address"]."|".$row["Remark"]."|",JSON_UNESCAPED_UNICODE);
    }
} else {
}
$conn->close();
?>