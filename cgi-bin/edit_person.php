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

for ($i=0; $i < 1; $i++) { 
	for ($j=0; $j < 1; $j++) { 
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

		$P_Name_CN =$Performer_Name_CN[$i][$j];
		$P_Nickname =$Performer_Nickname[$i][$j];
		$P_Name =$Performer_Name[$i][$j];
		$P_Gender =$Gender[$i][$j];
		$P_NYCOS =$NYCOS[$i][$j];
		$P_Youth =$Youth[$i][$j];
		$P_Bios_CN =$Bios_CN[$i][$j];
		$P_Bios =$Bios[$i][$j];
		$P_Tel =$Tel[$i][$j];
		$P_Email =$Email[$i][$j];
		$P_Remark =$Remark[$i][$j];

		//check if Person exists
		if ($Performer_Nickname[$i][$j]=="''") {
			$sql = "SELECT * FROM `Person` WHERE `Name_CN` = $P_Name_CN AND `Nickname` IS NULL";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				$sql="UPDATE `Person` SET `Name`=$P_Name,`Gender`=$P_Gender,`NYCOS`=$P_NYCOS,`Youth`=$P_Youth,`Bios`=$P_Bios,`Bios_CN`=$P_Bios_CN,`Tel`=$P_Tel,`Email`=$P_Email,`Remark`=$P_Remark WHERE `Name_CN` = $P_Name_CN  AND `Nickname` IS NULL";
				$conn->query("SET NAMES utf8"); 
				$conn->query($sql);
			}
			
			else {
				$sql="INSERT INTO `Person`(`Name`, `Name_CN`, `Gender`, `NYCOS`, `Youth`, `Bios`, `Bios_CN`, `Tel`, `Email`, `Remark`) VALUES ($P_Name,$P_Name_CN, $P_Gender, $P_NYCOS, $P_Youth, $P_Bios, $P_Bios_CN, $P_Tel, $P_Email, $P_Remark)";
				$conn->query("SET NAMES utf8"); 
				$conn->query($sql);
			}
		}
		else{
			$sql="SELECT * FROM `Person` WHERE `Name_CN` = $P_Name_CN  AND `Nickname`= $P_Nickname";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				$sql="UPDATE `Person` SET `Name`=$P_Name, `Gender`=$P_Gender,`NYCOS`=$P_NYCOS,`Youth`=$P_Youth,`Bios`=$P_Bios,`Bios_CN`=$P_Bios_CN,`Tel`=$P_Tel,`Email`=$P_Email,`Remark`=$P_Remark WHERE `Name_CN` = $P_Name_CN  AND `Nickname`= $P_Nickname";
				$conn->query("SET NAMES utf8"); 
				$conn->query($sql);
			}
			
			else {
				$sql="INSERT INTO `Person`(`Name`, `Name_CN`, `Nickname`, `Gender`, `NYCOS`, `Youth`, `Bios`, `Bios_CN`, `Tel`, `Email`, `Remark`) VALUES ($P_Name,$P_Name_CN, $P_Nickname, $P_Gender, $P_NYCOS, $P_Youth, $P_Bios, $P_Bios_CN, $P_Tel, $P_Email, $P_Remark)";
				$conn->query("SET NAMES utf8"); 
				$conn->query($sql);
			}
		}
	}
}
$conn->close();

?>