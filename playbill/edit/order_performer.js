var string="&"+window.location.search.substring(1);
var array=string.split('&'); 
var time=array[1]+' '+array[2];

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
	xhttp.open("GET", "/cgi-bin/order_performer.php?time="+time, true);
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
				window.location.href = "/playbill/edit?"+array[1]+"&"+array[2];
			}
		}
	};
	xhttp.open("GET", "/cgi-bin/login_performance.php?input="+"&time="+time, true);
	xhttp.send();
}
check();

var up=function(sender){
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
			show();
		}
	};
	xhttp.open("GET", "/cgi-bin/performer_up.php?input="+sender, true);
	xhttp.send();
}

var down=function(sender){
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
			show();
		}
	};
	xhttp.open("GET", "/cgi-bin/performer_down.php?input="+sender, true);
	xhttp.send();
}
var back=function(){
	window.location.href = "/playbill/edit/playbill.html?"+array[1]+"&"+array[2];
}