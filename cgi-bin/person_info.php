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
$name=$_REQUEST["name"];
$nickname=$_REQUEST["nickname"];

$conn->query("SET NAMES utf8"); 
if ($nickname=="") {
	$sql = "SELECT * FROM Person where Name_CN='".$name."'";
}
else{
	$sql = "SELECT * FROM Person where Name_CN='".$name."'and Nickname='".$nickname."'";
}
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
		$Bios_CN = str_replace("%|%", "*", $row["Bios_CN"]);
		$Bios = str_replace("%|%", "*", $row["Bios"]);
        echo json_encode($row["Name"]."|".$row["Gender"]."|".$row["NYCOS"]."|".$row["Youth"]."|".$Bios_CN."|".$Bios."|".$row["Tel"]."|".$row["Email"]."|".$row["Remark"]."|",JSON_UNESCAPED_UNICODE);
    }
} else {
	echo json_encode("meiyou|");
}
$conn->close();

?>