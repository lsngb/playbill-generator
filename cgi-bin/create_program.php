<?php
session_start();
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

/*$_SESSION["datetime"] = $_REQUEST["time"];
*/

$_SESSION["order"]++;

$role_id=(int)$_REQUEST["role_id"];
$performer_id=$_REQUEST["performer_id"];
$Name_CN="'".$_REQUEST["CN_Name"]."'";
$Name="'".$_REQUEST["Name"]."'";
$Part_CN="'".$_REQUEST["CN_Part"]."'";
$Part="'".$_REQUEST["Part"]."'";
$Program_type="'".$_REQUEST["Program_type"]."'";
$Synopsis_CN="'".$_REQUEST["CN_Synopsis"]."'";
$Synopsis="'".$_REQUEST["Synopsis"]."'";

$Role_Name_CN=$_REQUEST["Role_Name_CN"];
$Role_Name=$_REQUEST["Role_Name"];
$Hangdang=$_REQUEST["Hangdang"];
$Role_type=$_REQUEST["Role_type"];

$Performer_Name_CN=$_REQUEST["Performer_Name_CN"];
$Performer_Nickname=$_REQUEST["Performer_Nickname"];
$Performer_Name=$_REQUEST["Performer_Name"];
$Gender=$_REQUEST["Gender"];
$NYCOS=$_REQUEST["NYCOS"];
$Youth=$_REQUEST["Youth"];
$Bios_CN=$_REQUEST["Bios_CN"];
$Bios=$_REQUEST["Bios"];
$Tel=$_REQUEST["Tel"];
$Email=$_REQUEST["Email"];
$Remark=$_REQUEST["Remark"];

$sql = "SELECT * FROM Program where Part_CN=$Part_CN and Name_CN=$Name_CN and Program_type=$Program_type";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$sql_location="UPDATE `Program` SET `Name`=$Name,`Part`=$Part,`Synopsis_CN`=$Synopsis_CN ,`Synopsis`=$Synopsis WHERE Part_CN=$Part_CN and Name_CN=$Name_CN";
	$conn->query($sql_location);
	//echo "found";
} else {
	$sql_location="INSERT INTO `Program`(`Name`, `Name_CN`, `Part`, `Part_CN`, `Synopsis`, `Synopsis_CN`, `Program_type`) VALUES ($Name,$Name_CN,$Part,$Part_CN,$Synopsis,$Synopsis_CN,$Program_type)";
	$conn->query($sql_location);
	//echo "not found";
}

for ($i=0; $i < $role_id+1; $i++) { 
	$performer_id[$i]=(int)$performer_id[$i];
	$Role_Name_CN[$i]="'".$Role_Name_CN[$i]."'";
	$Role_Name[$i]="'".$Role_Name[$i]."'";
	$Hangdang[$i]="'".$Hangdang[$i]."'";
	$Role_type[$i]="'".$Role_type[$i]."'";

	$sql = "SELECT P.ID, R.Name_CN FROM Program P, Role R where P.Part_CN=$Part_CN and P.Name_CN= $Name_CN and R.Name_CN= $Role_Name_CN[$i]  and P.ID=R.PID";
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		$temp=(int)$row['ID'];
		$sql="UPDATE `Role` SET `Role_type`=$Role_type[$i] ,`Hangdang`=$Hangdang[$i] WHERE `PID`=$temp and Name_CN=$Role_Name_CN[$i]";
		$conn->query($sql);
		$sql="UPDATE `Role_name` SET `Name`=$Role_Name[$i], WHERE `Name_CN`=$Role_Name_CN[$i]";
		$conn->query($sql);
	} else {
		//Get PID from Program
		$sql = "SELECT ID FROM Program where Part_CN=$Part_CN and Name_CN= $Name_CN";
		$conn->query("SET NAMES utf8"); 
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		$temp=(int)$row['ID'];
		//insert new Role
		$sql="INSERT INTO `Role`(`PID`, `Name_CN`, `Role_type`, `Hangdang`) VALUES ($temp,$Role_Name_CN[$i],$Role_type[$i],$Hangdang[$i])";
		$conn->query($sql);
		//check if Role_name exists
		$sql = "SELECT Name FROM Role_name where Name_CN=$Role_Name_CN[$i]";
		$conn->query($sql);
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$sql="UPDATE `Role_name` SET `Name`=$Role_Name[$i], WHERE `Name_CN`=$Role_Name_CN[$i]";
			$conn->query($sql);
		}
		else {
			$sql="INSERT INTO `Role_name`(`Name_CN`, `Name`) VALUES ($Role_Name_CN[$i],$Role_Name[$i])";
			$conn->query($sql);
		}
	}

	for ($j=0; $j < $performer_id[$i]+1; $j++) { 
		$Performer_Name_CN[$i][$j]="'".$Performer_Name_CN[$i][$j]."'";
		$Performer_Nickname[$i][$j]="'".$Performer_Nickname[$i][$j]."'";
		$Performer_Name[$i][$j]="'".$Performer_Name[$i][$j]."'";
		$Gender[$i][$j]="'".$Gender[$i][$j]."'";
		$NYCOS[$i][$j]="'".$NYCOS[$i][$j]."'";
		$Youth[$i][$j]="'".$Youth[$i][$j]."'";
		$Bios_CN[$i][$j]="'".$Bios_CN[$i][$j]."'";
		$Bios[$i][$j]="'".$Bios[$i][$j]."'";
		$Tel[$i][$j]="'".$Tel[$i][$j]."'";
		$Email[$i][$j]="'".$Email[$i][$j]."'";
		$Remark[$i][$j]="'".$Remark[$i][$j]."'";
	}
}

$conn->close();
?>