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
$input = '"'.$_REQUEST["name"].'"';
$conn->query("SET NAMES utf8"); 
$sql = "SELECT DISTINCT Part_CN FROM Program where Name_CN=".$input;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
        echo json_encode($row["Part_CN"]."|",JSON_UNESCAPED_UNICODE);
        //"<a href=".'"'."performance?datetime=".str_replace(" ","&",$row["Date_time"]).'">'.$row["Date_time"]."</a>　　".$row["Location"]."<br>";
    }
} else {
	//echo json_encode("0");
}
$conn->close();

?>