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

$Person_nickname=array();
$Person_order=array();
$Person_ID=array();

$i=0;

$p_sql="SELECT DISTINCT * FROM `Performer` WHERE `Date_time` = $time";
$conn->query("SET NAMES utf8"); 
$p_result = $conn->query($p_sql);

while($p_row = $p_result->fetch_assoc()) {
	$PERID=$p_row["PERID"];
	$person_sql="SELECT * FROM `Person` WHERE `ID` = $PERID";
	$conn->query("SET NAMES utf8"); 
	$person_result = $conn->query($person_sql);
	$person_row=$person_result->fetch_assoc();

	$name="";

	if ($person_row["Nickname"]=="") {
		$name = $person_row["Name_CN"];
	}
	else{
		$name = $person_row["Name_CN"]."@".$person_row["Nickname"];
	}

	if (!in_array($name,$Person_nickname) ) {
		$i++;
		$Order=$person_row["Order"];

		$flag=-1;
		while ($flag == -1) {
			if (in_array($Order,$Person_order) || $Order==0) {
				$flag=-1;
				$Order=$Order-$PERID;
				$order_sql="UPDATE `Person` SET `Order`=$Order WHERE `ID`= $PERID";
				$conn->query($order_sql);
			}
			else{$flag=0;}
		}

		array_push($Person_order, $Order);
		$Person_nickname[(string)$Order] = $name;
		$Person_ID[(string)$Order]=$PERID;
	}
}

rsort($Person_order);
$Person_order[-1]="x";
$Person_order[-2]="x";
$Person_order[$i]="x";
$Person_order[$i+1]="x";
$Person_ID["x"]="x";
$output="";
$up="";
$down="";
$temp="";
for ($m=0; $m <$i ; $m++) {
	$temp=$Person_ID[(string)($Person_order[$m-2])]."|".$Person_ID[(string)($Person_order[$m-1])]."|".$Person_ID[(string)($Person_order[$m])]."|".$Person_ID[(string)($Person_order[$m+1])]."|".$Person_ID[(string)($Person_order[$m+2])];
	$up='<div class="new"><a href="javascript:up(&quot;'.$temp.'&quot;);">↑</a></div>';
	$down='<div class="new"><a href="javascript:down(&quot;'.$temp.'&quot;);">↓</a></div>';
	$output=$output.$up."　".$down."　".$Person_nickname[(string)($Person_order[$m])]."<br>---------------------<br>";
}

echo $output;
$conn->close();


?>