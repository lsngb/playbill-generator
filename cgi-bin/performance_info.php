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

$time="'".$_REQUEST["time"]."'";

$sql = "SELECT * FROM Performance WHERE `Date_time`=$time";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		echo "Date & Time:<br>　　".$row["Date_time"]."<br><br>Location:<br>　　".$row["Location"];
    }
} else {
	echo "Error!";
}
$conn->close();

?>