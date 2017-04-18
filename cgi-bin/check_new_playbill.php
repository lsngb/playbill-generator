<?php

session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
	echo json_encode(1,JSON_UNESCAPED_UNICODE);
}

else {echo (0);}

echo "|";

if (isset($_SESSION["order"])) {
	echo json_encode($_SESSION["order"],JSON_UNESCAPED_UNICODE);
}

echo "|";

if (isset($_SESSION["time"])) {
	echo json_encode($_SESSION["time"],JSON_UNESCAPED_UNICODE);
}



?>