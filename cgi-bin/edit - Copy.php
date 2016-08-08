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

$sql="SELECT DISTINCT * FROM `Program_performed` WHERE `Date_time` = $time ORDER BY `ID`";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);

$Program_name_CN=array();
$Program_name_EN=array();
$Program_info_CN=array();
$Program_info_EN=array();

$Person_name_CN=array();
$Person_nickname=array();
$Person_name_EN=array();
$Person_gender=array();
$Person_info_CN=array();
$Person_info_EN=array();
$Person_order=array();

$Instrument_order=array();
$Func_order=array();

$Program_CN="<h2>節目/Program</h2>";
$Program_EN="";
$i=0;
$j=0;

while($row = $result->fetch_assoc()) {
	$i++;
	$PROID=$row["PID"];
    $program_sql="SELECT * FROM `Program` WHERE `ID` = $PROID";
    $conn->query("SET NAMES utf8"); 
	$program_result = $conn->query($program_sql);
	$program_row=$program_result->fetch_assoc();

	if ($program_row["Part_CN"]=="NULL") {
		$Program_CN = $Program_CN . "<h3>《" . $program_row["Name_CN"] . "》<br>". $program_row["Name"]."</h3>";
		//$Program_EN = $Program_EN . "<h3>" . . "</h3>";
		array_push($Program_name_CN,"<h3>《" . $program_row["Name_CN"] . "》<br>");
		array_push($Program_name_EN, $program_row["Name"] . "</h3>");
	}

	else{
		$Program_CN = $Program_CN . "<h3>《" . $program_row["Name_CN"] . "·". $program_row["Part_CN"] . "》<br>";
		array_push($Program_name_CN,"<h3>《" . $program_row["Name_CN"] . "·". $program_row["Part_CN"] . "》<br>");
		if ($program_row["Part"]=="") {
			$Program_CN = $Program_CN . $program_row["Name"] . "</h3>";
			array_push($Program_name_EN, $program_row["Name"] . "</h3>");
		}
		else{
			$Program_CN = $Program_CN . $program_row["Name"] . " (". $program_row["Part"] . ")</h3>";
			array_push($Program_name_EN,$program_row["Name"] . " (". $program_row["Part"] . ")</h3>");
		}
	}
	
	array_push($Program_info_CN, $program_row["Synopsis_CN"]);
	array_push($Program_info_EN, $program_row["Synopsis"]);

	$performer_sql="SELECT DISTINCT RID FROM `Performer` WHERE `Date_time` = $time and `PROID`=$PROID  ORDER BY `RID`";
	$conn->query("SET NAMES utf8"); 
	$performer_result = $conn->query($performer_sql);
	while($performer_row = $performer_result->fetch_assoc()) {
		$RID=$performer_row["RID"];
		$role_sql="SELECT * FROM `Role` WHERE `ID` = $RID";
		$conn->query("SET NAMES utf8"); 
		$role_result = $conn->query($role_sql);
		$role_row=$role_result->fetch_assoc();
		$Program_CN = $Program_CN . "<p>" . $role_row["Name_CN"]."：";

		$Role_sql="SELECT * FROM `Role_name` WHERE `Name_CN` = '".$role_row["Name_CN"]."'";
		$conn->query("SET NAMES utf8"); 
		$Role_result = $conn->query($Role_sql);
		$Role_row=$Role_result->fetch_assoc();
		$Program_EN = "<br>" . $Role_row["Name"].": ";

		$p_sql="SELECT DISTINCT * FROM `Performer` WHERE `Date_time` = $time and `PROID`=$PROID and `RID`=$RID ORDER BY `ID`";
		$conn->query("SET NAMES utf8"); 
		$p_result = $conn->query($p_sql);

		while($p_row = $p_result->fetch_assoc()) {
			$j++;
			$PERID=$p_row["PERID"];
			$person_sql="SELECT * FROM `Person` WHERE `ID` = $PERID";
			$conn->query("SET NAMES utf8"); 
			$person_result = $conn->query($person_sql);
			$person_row=$person_result->fetch_assoc();
			$Program_CN = $Program_CN . $person_row["Name_CN"] . "、";
			$Program_EN = $Program_EN . $person_row["Name"] . ", ";

			if (!in_array($person_row["Name_CN"].$person_row["Nickname"],$Person_nickname) ) {
				array_push($Person_nickname, $person_row["Name_CN"].$person_row["Nickname"]);
				array_push($Person_name_CN, $person_row["Name_CN"]);
				array_push($Person_order, $person_row["Order"]);
				array_push($Person_name_EN, $person_row["Name"]);
				array_push($Person_gender, $person_row["Gender"]);
				array_push($Person_info_CN, $person_row["Bios_CN"]);
				array_push($Person_info_EN, $person_row["Bios"]);
			}
			else{$j--;}
		}

		$Program_CN=substr($Program_CN, 0, -3);
		$Program_EN=substr($Program_EN, 0, -2);
		$Program_CN=$Program_CN.$Program_EN."<br>";
		$Program_EN="";
	}
	$Program_CN=$Program_CN."</p>";
}

$Program_CN=$Program_CN."<h2>樂隊/Orchestra</h2>";
$sql="SELECT DISTINCT O.Name_CN FROM Orchestra O,Instrument I WHERE O.Date_time = $time AND O.Name_CN=I.Name_CN ORDER BY I.Order";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);
while($row = $result->fetch_assoc()) {
	$Name_CN=$row["Name_CN"];
	$Program_CN = $Program_CN. "<p>" . $Name_CN . "：";
	$staff_sql="SELECT * FROM `Instrument` WHERE `Name_CN` = '".$Name_CN."'";
	$conn->query("SET NAMES utf8"); 
	$staff_result = $conn->query($staff_sql);
	$staff_row=$staff_result->fetch_assoc();
	$Program_EN = $Program_EN . "<br>" . $staff_row["Name"].": ";

	$p_sql="SELECT * FROM `Orchestra` WHERE `Date_time` = $time and `Name_CN` = '".$Name_CN."' ORDER BY `ID`";
	$conn->query("SET NAMES utf8"); 
	$p_result = $conn->query($p_sql);
	while($p_row = $p_result->fetch_assoc()) {
		$PID=$p_row["PID"];
		$person_sql="SELECT * FROM `Person` WHERE `ID` = $PID";
		$conn->query("SET NAMES utf8"); 
		$person_result = $conn->query($person_sql);
		$person_row=$person_result->fetch_assoc();
		$Program_CN = $Program_CN . $person_row["Name_CN"]."、";
		$Program_EN = $Program_EN . $person_row["Name"].", ";
	}
	$Program_CN=substr($Program_CN, 0, -3);
	$Program_EN=substr($Program_EN, 0, -2);
	$Program_CN=$Program_CN.$Program_EN;
	$Program_EN="";

}
$Program_CN=$Program_CN."</p>";
$Program_EN="";

$Program_CN=$Program_CN."<h2>演出工作人員/Production Team</h2>";
$sql="SELECT DISTINCT S.Name_CN FROM Staff S, Function F WHERE S.Date_time = $time AND S.Name_CN = F.Name_CN ORDER BY F.Order";
$conn->query("SET NAMES utf8"); 
$result = $conn->query($sql);
while($row = $result->fetch_assoc()) {
	$Name_CN=$row["Name_CN"];
	$Program_CN = $Program_CN. "<p>" . $Name_CN . "：";
	$staff_sql="SELECT * FROM `Function` WHERE `Name_CN` = '".$Name_CN."'";
	$conn->query("SET NAMES utf8"); 
	$staff_result = $conn->query($staff_sql);
	$staff_row=$staff_result->fetch_assoc();
	$Program_EN = $Program_EN . "<br>" . $staff_row["Name"].": ";

	$p_sql="SELECT * FROM `Staff` WHERE `Date_time` = $time and `Name_CN` = '".$Name_CN."' ORDER BY `ID`";
	$conn->query("SET NAMES utf8"); 
	$p_result = $conn->query($p_sql);
	while($p_row = $p_result->fetch_assoc()) {
		$PID=$p_row["PID"];
		$person_sql="SELECT * FROM `Person` WHERE `ID` = $PID";
		$conn->query("SET NAMES utf8"); 
		$person_result = $conn->query($person_sql);
		$person_row=$person_result->fetch_assoc();
		$Program_CN = $Program_CN . $person_row["Name_CN"]."、";
		$Program_EN = $Program_EN . $person_row["Name"].", ";
	}
	$Program_CN=substr($Program_CN, 0, -3);
	$Program_EN=substr($Program_EN, 0, -2);
	$Program_CN=$Program_CN.$Program_EN;
	$Program_EN="";

}
$Program_CN=$Program_CN."</p>";
$Program_EN="";

$Program_CN=$Program_CN."<h2>劇情簡介/Synopsis</h2>";

for ($m=0; $m <$i ; $m++) {
	if ($Program_info_CN[$m]=="NULL") {
		continue;
	}
	$Program_CN=$Program_CN.$Program_name_CN[$m].$Program_name_EN[$m]."<p>".$Program_info_CN[$m];
	$Program_CN=$Program_CN."<br>".$Program_info_EN[$m]."</p>";
}

$Program_CN=$Program_CN."<h2>演員簡介/Performers’ Bio</h2>";
for ($m=0; $m <$j ; $m++) {
	if ($Person_name_CN[$m]=="") {
		continue;
	}
	$Program_CN=$Program_CN."<p><span style='font-weight:bold;'>".$Person_name_CN[$m]."</span>，".$Person_info_CN[$m]."<br>";

	if ($Person_gender[$m]=="F") {
		$Program_CN=$Program_CN."<span style='font-weight:bold;'>Ms. ".$Person_name_EN[$m]."</span> ".$Person_info_EN[$m]."</p>";
	}
	else{
		$Program_CN=$Program_CN."<span style='font-weight:bold;'>Mr. ".$Person_name_EN[$m]."</span> ".$Person_info_EN[$m]."</p>";
	}
}
$Program_CN=str_replace("＇","'",$Program_CN);
$Program_CN=str_replace("＂",'"',$Program_CN);

echo $Program_CN;
$conn->close();
?>