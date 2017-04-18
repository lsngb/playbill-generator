<?php
session_start();
echo "1";
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


$_SESSION["order"]++;

$time="'".$_SESSION["time"]."'";
if (array_key_exists('program_id', $_REQUEST)) {
	$program_id=(int)$_REQUEST["program_id"];
}

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

//insert or update Program info
$sql = "SELECT * FROM Program where Part_CN=$Part_CN and Name_CN=$Name_CN and Program_type=$Program_type";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$sql_location="UPDATE `Program` SET `Name`=$Name,`Part`=$Part,`Synopsis_CN`=$Synopsis_CN ,`Synopsis`=$Synopsis WHERE Part_CN=$Part_CN and Name_CN=$Name_CN";
	$conn->query("SET NAMES utf8"); 
	$conn->query($sql_location);

} else {
	$sql_location="INSERT INTO `Program`(`Name`, `Name_CN`, `Part`, `Part_CN`, `Synopsis`, `Synopsis_CN`, `Program_type`) VALUES ($Name,$Name_CN,$Part,$Part_CN,$Synopsis,$Synopsis_CN,$Program_type)";
	$conn->query("SET NAMES utf8"); 
	$conn->query($sql_location);
}

//Get PID from Program
$sql = "SELECT ID FROM Program where Part_CN=$Part_CN and Name_CN= $Name_CN";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$temp=(int)$row['ID'];

//delete performer before role insertion
$sql="DELETE FROM `Performer` WHERE `Date_time`=$time and `PROID`=$temp";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

//Check if Program_performed exists
$sql = "SELECT * FROM `Program_performed` WHERE `Date_time` = $time AND `PID`=$temp";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	

} else {
	//insert into Program_performed
	if (array_key_exists('program_id', $_REQUEST)) {
		$sql="INSERT INTO `Program_performed`(`Date_time`, `PID`,`Order`) VALUES ($time,$temp,$program_id*10)";
	}
	else{
		$sql="INSERT INTO `Program_performed`(`Date_time`, `PID`,`Order`) VALUES ($time,$temp,0)";
	}
	
	$conn->query("SET NAMES utf8"); 
	$result = $conn->query($sql);
}


for ($i=0; $i < $role_id+1; $i++) { 
	$performer_id[$i]=(int)$performer_id[$i];//num of performers each role
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
		$conn->query("SET NAMES utf8"); 
		$conn->query($sql);
		//check if Role_name exists
		$sql = "SELECT Name FROM Role_name where Name_CN=$Role_Name_CN[$i]";
		$conn->query("SET NAMES utf8"); 
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$sql="UPDATE `Role_name` SET `Name`=$Role_Name[$i] WHERE `Name_CN`=$Role_Name_CN[$i]";
			$conn->query("SET NAMES utf8"); 
			$conn->query($sql);
		}

		else {
			$sql="INSERT INTO `Role_name`(`Name_CN`, `Name`) VALUES ($Role_Name_CN[$i],$Role_Name[$i])";
			$conn->query("SET NAMES utf8"); 
			$conn->query($sql);
		}

	} else {
		//Get PID from Program
		$sql = "SELECT ID FROM Program where Part_CN=$Part_CN and Name_CN= $Name_CN";
		$conn->query("SET NAMES utf8"); 
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		$temp=(int)$row['ID'];

		//insert new Role
		$sql="INSERT INTO `Role`(`PID`, `Name_CN`, `Role_type`, `Hangdang`) VALUES ($temp,$Role_Name_CN[$i],$Role_type[$i],$Hangdang[$i])";
		$conn->query("SET NAMES utf8"); 
		$conn->query($sql);

		//check if Role_name exists
		$sql = "SELECT Name FROM Role_name where Name_CN=$Role_Name_CN[$i]";
		$conn->query("SET NAMES utf8"); 
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$sql="UPDATE `Role_name` SET `Name`=$Role_Name[$i] WHERE `Name_CN`=$Role_Name_CN[$i]";
			$conn->query("SET NAMES utf8"); 
			$conn->query($sql);
		}

		else {
			$sql="INSERT INTO `Role_name`(`Name_CN`, `Name`) VALUES ($Role_Name_CN[$i],$Role_Name[$i])";
			$conn->query("SET NAMES utf8"); 
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

		//Get PID from Program
		$sql = "SELECT ID FROM Program where Part_CN=$Part_CN and Name_CN= $Name_CN";
		$conn->query("SET NAMES utf8"); 
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		$PROID=(int)$row['ID'];

		//Get RID from Role
		$sql = "SELECT ID FROM Role where Name_CN=$Role_Name_CN[$i] and PID=$PROID";
		$conn->query("SET NAMES utf8");
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		$RID=(int)$row['ID'];

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

		//Get PERID from Person
		if ($Performer_Nickname[$i][$j]=="''") {
			$sql = "SELECT * FROM `Person` WHERE `Name_CN` = $P_Name_CN  AND `Nickname` IS NULL";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
			$PERID=(int)$row['ID'];
		}
		else{
			$sql="SELECT * FROM `Person` WHERE `Name_CN` = $P_Name_CN  AND `Nickname`= $P_Nickname";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
			$PERID=(int)$row['ID'];
		}

		//Check if Performer exists
		$sql = "SELECT * FROM `Performer` WHERE `PROID` = $PROID AND `Date_time` = $time AND `RID` = $RID AND `PERID`=$PERID";
		$conn->query("SET NAMES utf8"); 
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			
		}
		else {
			//insert into Performer
			$sql="INSERT INTO `Performer`(`PROID`, `Date_time`, `PERID`, `RID`) VALUES ($PROID,$time,$PERID,$RID)";
			$conn->query("SET NAMES utf8"); 
			$result = $conn->query($sql);
		}
	}
}
echo "string";
$conn->close();

?>