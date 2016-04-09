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
$conn->query("SET NAMES utf8"); 
$sql = "SELECT Name_CN, Nickname FROM Person" ;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
		if ($row["Nickname"]===NULL) {
			echo json_encode($row["Name_CN"]."|",JSON_UNESCAPED_UNICODE);
		}
		else{
        	echo json_encode($row["Name_CN"]."@".$row["Nickname"]."|",JSON_UNESCAPED_UNICODE);
		}
    }
} else {
	echo json_encode("0");
}
$conn->close();

?>