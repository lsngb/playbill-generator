var string=window.location.search.substring(1);
var array=string.split('&'); 
var time=array[0]+' '+array[1];

var show=function(){
	var xhttp;
	if (window.XMLHttpRequest) {
	    // code for modern browsers
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var str=xhttp.responseText;
			document.getElementById("body").innerHTML="";
			document.getElementById("body").innerHTML=str;
		}
	};
	xhttp.open("GET", "/cgi-bin/edit.php?time="+time, true);
	xhttp.send();
}

var check=function(){
	var xhttp;
	if (window.XMLHttpRequest) {
	    // code for modern browsers
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var str=xhttp.responseText;
			if (str=="1") {show();return 0;}
			else{
				alert("請先登錄！");
				window.location.href = "/playbill/edit?"+array[0]+"&"+array[1];
			}
		}
	};
	xhttp.open("GET", "/cgi-bin/login_performance.php?input="+"&time="+time, true);
	xhttp.send();
}
check();

var delete_playbill=function(){
	var r = confirm("Are you sure to DELETE this playbill?");
	if (r == true) {
	    var xhttp;
		if (window.XMLHttpRequest) {
		    // code for modern browsers
		    xhttp = new XMLHttpRequest();
		    } else {
		    // code for IE6, IE5
		    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				window.location.href = "/playbill/";
			}
		};
		xhttp.open("GET", "/cgi-bin/delete_performance.php?time="+time, true);
		xhttp.send();
	} else {
	    
	}
}
var edit_program=function(){
	window.location.href = "edit_program.html?"+string;
}
var order_program=function(){
	window.location.href = "order_program.html?"+string;
}
var edit_orchestra=function(){
	window.location.href = "edit_orchestra.html?"+string;
}
var edit_staff=function(){
	window.location.href = "edit_staff.html?"+string;
}
var edit_synopsis=function(){
	window.location.href = "edit_synopsis.html?"+time;
}
var edit_bio=function(){
	window.location.href = "edit_bio.html?"+string;
}
var order_performer = function(){
	window.location.href = "order_performer.html?"+string;
}