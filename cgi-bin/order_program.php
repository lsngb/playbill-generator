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

$Program_name_CN=array();
$Program_order=array();
$Program_ID=array();

$i=0;

$p_sql="SELECT DISTINCT * FROM `Program_performed` WHERE `Date_time` = $time";
$conn->query("SET NAMES utf8"); 
$p_result = $conn->query($p_sql);

while($p_row = $p_result->fetch_assoc()) {
	$Order=$p_row["Order"];
	$PROID=$p_row["PID"];

	array_push($Program_order, $Order);
	$Program_ID[(string)$Order]=$PROID;

	$i++;
    $program_sql="SELECT * FROM `Program` WHERE `ID` = $PROID";
    $conn->query("SET NAMES utf8"); 
	$program_result = $conn->query($program_sql);
	$program_row=$program_result->fetch_assoc();
	if ($program_row["Part_CN"]=="NULL") {
		$Program_name_CN[(string)$Order]="《" . $program_row["Name_CN"] . "》";
	}

	else{
		$Program_name_CN[(string)$Order]="《" . $program_row["Name_CN"] . "·". $program_row["Part_CN"] . "》";
	}
	

}

rsort($Program_order);
$Program_order[-1]="x";
$Program_order[-2]="x";
$Program_order[$i]="x";
$Program_order[$i+1]="x";
$Program_ID["x"]="x";
$output="";
$up="";
$down="";
$temp="";
for ($m=0; $m <$i ; $m++) {
	$temp=$Program_ID[(string)($Program_order[$m-2])]."|".$Program_ID[(string)($Program_order[$m-1])]."|".$Program_ID[(string)($Program_order[$m])]."|".$Program_ID[(string)($Program_order[$m+1])]."|".$Program_ID[(string)($Program_order[$m+2])];
	$up='<div class="new"><a href="javascript:up(&quot;'.$temp.'&quot;);">↑</a></div>';
	$down='<div class="new"><a href="javascript:down(&quot;'.$temp.'&quot;);">↓</a></div>';
	$output=$output.$up."　".$down."　".$Program_name_CN[(string)($Program_order[$m])]."<br>---------------------<br>";
}

echo $output;
$conn->close();
?>