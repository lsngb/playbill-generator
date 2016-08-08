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

$instrument_id=(int)$_REQUEST["instrument_id"];
$player_id=$_REQUEST["player_id"];

$Instrument_Name_CN=$_REQUEST["Instrument_Name_CN"];
$Instrument_Name=$_REQUEST["Instrument_Name"];

$Player_Name_CN=$_REQUEST["Player_Name_CN"];
$Player_Nickname=$_REQUEST["Player_Nickname"];
$Player_Name=$_REQUEST["Player_Name"];

$sql="DELETE FROM `Orchestra` WHERE `Date_time`=$time AND `Name_CN`=$Instrument_Name_CN[$i]";
$conn->query("SET NAMES utf8");
$conn->query($sql);

for ($i=0; $i < $instrument_id+1; $i++) { 
	$player_id[$i]=(int)$player_id[$i];//num of players each instrument
	$Instrument_Name_CN[$i]="'".$Instrument_Name_CN[$i]."'";
	$Instrument_Name[$i]="'".$Instrument_Name[$i]."'";

	//check if instrument exists
	$sql="SELECT * FROM `Instrument` WHERE `Name_CN` = $Instrument_Name_CN[$i]";
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$sql="UPDATE `Instrument` SET `Name`=$Instrument_Name[$i] WHERE `Name_CN`=$Instrument_Name_CN[$i]";
		$conn->query("SET NAMES utf8");
		$conn->query($sql);
	}
	else{
		$sql="INSERT INTO `Instrument`(`Name_CN`, `Name`) VALUES ($Instrument_Name_CN[$i],$Instrument_Name[$i])";
		$conn->query("SET NAMES utf8");
		$conn->query($sql);
	}

	for ($j=0; $j < $player_id[$i]+1; $j++) { 
		$Player_Name_CN[$i][$j]="'".$Player_Name_CN[$i][$j]."'";
		$Player_Nickname[$i][$j]="'".$Player_Nickname[$i][$j]."'";
		$Player_Name[$i][$j]="'".$Player_Name[$i][$j]."'";
		$P_Name_CN =$Player_Name_CN[$i][$j];
		$P_Nickname =$Player_Nickname[$i][$j];
		$P_Name =$Player_Name[$i][$j];

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

		$sql="INSERT INTO `Orchestra`(`PID`, `Date_time`, `Name_CN`) VALUES ($PID,$time,$Instrument_Name_CN[$i])";
		$conn->query("SET NAMES utf8");
		$conn->query($sql);
	}
}
$conn->close();
?>