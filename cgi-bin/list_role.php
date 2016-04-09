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

$conn->query("SET NAMES utf8"); 
$sql = "SELECT P.ID, R.Name_CN FROM Program P, Role R where P.Part_CN='".$part."'and P.Name_CN='".$program."' and P.ID=R.PID";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
        echo json_encode($row["Name_CN"]."|",JSON_UNESCAPED_UNICODE);
        //"<a href=".'"'."performance?datetime=".str_replace(" ","&",$row["Date_time"]).'">'.$row["Date_time"]."</a>　　".$row["Location"]."<br>";
    }
} else {
	echo json_encode("0");
}
$conn->close();

?>