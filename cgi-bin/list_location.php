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

$sql = "SELECT Name FROM Location order by Name" ;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
        echo json_encode($row["Name"]."|");
        //"<a href=".'"'."performance?datetime=".str_replace(" ","&",$row["Date_time"]).'">'.$row["Date_time"]."</a>　　".$row["Location"]."<br>";
    }
} else {
	echo json_encode("0");
}
$conn->close();

?>