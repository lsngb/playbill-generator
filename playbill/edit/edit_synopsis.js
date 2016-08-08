var string="&"+window.location.search.substring(1);
var array=string.split('&'); 
var time=array[1]+' '+array[2];

document.getElementById("title").innerHTML="添加劇目"+(program_num+1);
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
			if (str=="1") {return 0;}
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
document.getElementById("p_num").innerHTML="劇目"+(program_num+1);
var programs=[];
var get_program=function(){
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
			programs = (str.replace(/"/g,"")).split('|');
			programs.pop();
			$(function() {
				$( "#Name" ).autocomplete({
					source: programs
				});
			});
		}
	};
	xhttp.open("GET", "/cgi-bin/list_program.php", true);
	xhttp.send();
}
var in_program=function(){
	var result=[];
	var input=(document.getElementById("Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	if(programs.indexOf(input)>-1){
		flag=1;
	}
	else{flag=0;}
	if (input=="") {return;}
	else {
		document.getElementById("EN_name").value='';
		if (flag===1) {
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
					result = (str.replace(/"/g,"")).split('|');
					document.getElementById("EN_name").value= result[0];
				}
			};
			xhttp.open("GET", "/cgi-bin/program_en.php?name="+input, true);
			xhttp.send();
		}
		else{
		}
	}
}
var parts=[];
var get_part=function(){
	var input=(document.getElementById("Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
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
			parts = (str.replace(/"/g,"")).split('|');
			parts.pop();
			$(function() {
				$( "#Part" ).autocomplete({
					source: parts
				});
			});
		}
	};
	xhttp.open("GET", "/cgi-bin/list_part.php?name="+input, true);
	xhttp.send();
}
var in_part=function(){
	var result=[];
	var part=(document.getElementById("Part").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var program=(document.getElementById("Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	if(parts.indexOf(part)>-1){
		flag=1;
	}
	else{flag=0;}
	if (part=="") {return;}
	else {
		document.getElementById("EN_part").value='';
		if (flag===1) {
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
					result = (str.replace(/"/g,"")).split('|');
					document.getElementById("EN_part").value= result[0];
					if (result[1]=='清') {
						document.getElementById("qing").checked = true;
						document.getElementById("cai").checked = false;
						get_radio();
					}
				}
			};
			xhttp.open("GET", "/cgi-bin/part_en.php?program="+program+"&part="+part, true);
			xhttp.send();
		}
		else{
		}
	}
}
var get_synopsis=function(){
	var result=[];
	var part=(document.getElementById("Part").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var program=(document.getElementById("Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	if(parts.indexOf(part)>-1 && programs.indexOf(program)>-1){
		flag=1;
	}
	else{flag=0;}
	if (part=="" || program=="") {return;}
	else {
		document.getElementById("EN_part").value='';
		if (flag===1) {
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
					str=str.replace(/\\n/g, "\n");
					result = (str.replace(/"/g,"")).split('|');
					document.getElementById("Synopsis").value= result[0];
					document.getElementById("EN_synopsis").value= result[1];
				}
			};
			xhttp.open("GET", "/cgi-bin/program_info.php?program="+program+"&part="+part, true);
			xhttp.send();
		}
		else{
		}
	}
}

var check_filled=function() {
	var flag=1;
	if (document.getElementById("Name").value==="" ||document.getElementById("EN_name").value==="" ||document.getElementById("Part").value==="" ||document.getElementById("Synopsis").value==="" ||document.getElementById("EN_synopsis").value==="") {flag=0; return flag;}
	return flag;
}

var send_back=function(sender){
	var CN_Name=(document.getElementById("Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var Name = (document.getElementById("EN_name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var CN_Part=(document.getElementById("Part").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var Part=(document.getElementById("EN_part").value).replace(/'/g, "＇").replace(/"/g, "＂");

	if(document.getElementById("qing").checked == true){
		var Program_type="清";
	}
	else{var Program_type="彩";}

	var CN_Synopsis=(document.getElementById("Synopsis").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var Synopsis=(document.getElementById("EN_synopsis").value).replace(/'/g, "＇").replace(/"/g, "＂");

	if (sender=="N") {
		$.ajax({
			method: "POST",
			url: "/cgi-bin/edit_program.php",
			data: {
				CN_Name:CN_Name,
				Name:Name,
				CN_Part:CN_Part,
				Part:Part,
				Program_type:Program_type,
				CN_Synopsis:CN_Synopsis,
				Synopsis:Synopsis
			},
			success: function(data) {
				window.location.href = "playbill.html?"+array[1]+'&'+array[2];
	    	}
		})
	};
}

var process=function(){
	if(check_filled()===0){
		document.getElementById("alert2").innerHTML="ERROR! Required field incomplete!";
		document.getElementById("alert1").innerHTML="";
		return 0;
	}
	else{
		document.getElementById("alert1").innerHTML="";
		document.getElementById("alert2").innerHTML="";
	}

	send_back('N');
}