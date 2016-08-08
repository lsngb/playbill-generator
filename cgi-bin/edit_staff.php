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

$time="'".$_SESSION["time"]."'";

$funct_id=(int)$_REQUEST["funct_id"];
$staff_id=$_REQUEST["staff_id"];

$funct_Name_CN=$_REQUEST["funct_Name_CN"];
$funct_Name=$_REQUEST["funct_Name"];

$staff_Name_CN=$_REQUEST["staff_Name_CN"];
$staff_Nickname=$_REQUEST["staff_Nickname"];
$staff_Name=$_REQUEST["staff_Name"];

for ($i=0; $i < $funct_id+1; $i++) { 
	$staff_id[$i]=(int)$staff_id[$i];//num of staffs each funct
	$funct_Name_CN[$i]="'".$funct_Name_CN[$i]."'";
	$funct_Name[$i]="'".$funct_Name[$i]."'";

	//check if funct exists
	$sql="SELECT * FROM `Function` WHERE `Name_CN` = $funct_Name_CN[$i]";
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$sql="UPDATE `Function` SET `Name`=$funct_Name[$i] WHERE `Name_CN`=$funct_Name_CN[$i]";
		$conn->query("SET NAMES utf8");
		$conn->query($sql);
	}
	else{
		$sql="INSERT INTO `Function`(`Name_CN`, `Name`) VALUES ($funct_Name_CN[$i],$funct_Name[$i])";
		$conn->query("SET NAMES utf8");
		$conn->query($sql);
	}

	$sql="DELETE FROM `Staff` WHERE `Date_time`=$time AND `Name_CN`=$funct_Name_CN[$i]";
	$conn->query("SET NAMES utf8");
	$conn->query($sql);

	for ($j=0; $j < $staff_id[$i]+1; $j++) { 
		$staff_Name_CN[$i][$j]="'".$staff_Name_CN[$i][$j]."'";
		$staff_Nickname[$i][$j]="'".$staff_Nickname[$i][$j]."'";
		$staff_Name[$i][$j]="'".$staff_Name[$i][$j]."'";
		$P_Name_CN =$staff_Name_CN[$i][$j];
		$P_Nickname =$staff_Nickname[$i][$j];
		$P_Name =$staff_Name[$i][$j];

		//check if Person exists
		if ($P_Nickname=="''") {
			$sql = "SELECT * FROM `Person` WHERE `Name_CN` = $P_Name_CN AND `Nickname` IS NULL";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				$sql="UPDATE `Person` SET `Name`=$P_Name WHERE `Name_CN` = $P_Name_CN  AND `Nickname` IS NULL";
				$conn->query("SET NAMES utf8");
				$conn->query($sql);
			}
			
			else {
				$sql="INSERT INTO `Person`(`Name`, `Name_CN`) VALUES ($P_Name,$P_Name_CN)";
				$conn->query("SET NAMES utf8");
				$conn->query($sql);
			}
		}
		else{
			$sql="SELECT * FROM `Person` WHERE `Name_CN` = $P_Name_CN  AND `Nickname`= $P_Nickname";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				$sql="UPDATE `Person` SET `Name`=$P_Name WHERE `Name_CN` = $P_Name_CN  AND `Nickname`= $P_Nickname";
				$conn->query("SET NAMES utf8");
				$conn->query($sql);
			}
			
			else {
				$sql="INSERT INTO `Person`(`Name`, `Name_CN`) VALUES ($P_Name,$P_Name_CN)";
				$conn->query("SET NAMES utf8");
				$conn->query($sql);
			}
		}

		//Get PID from Person
		if ($P_Nickname=="''") {
			$sql = "SELECT * FROM `Person` WHERE `Name_CN` = $P_Name_CN  AND `Nickname` IS NULL";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
			$PID=(int)$row['ID'];
		}
		else{
			$sql="SELECT * FROM `Person` WHERE `Name_CN` = $P_Name_CN  AND `Nickname`= $P_Nickname";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
			$PID=(int)$row['ID'];
		}

		$sql="INSERT INTO `Staff`(`PID`, `Date_time`, `Name_CN`) VALUES ($PID,$time,$funct_Name_CN[$i])";
		$conn->query("SET NAMES utf8");
		$conn->query($sql);
	}
}

$conn->close();
?>