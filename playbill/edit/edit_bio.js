var string="&"+window.location.search.substring(1);
var array=string.split('&'); 
var time=array[1]+' '+array[2];

document.getElementById("title").innerHTML="修改演員信息";
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

var performers=[];
var get_performer=function(sender){
	temp = sender.split('|');
	var role_num=parseInt(temp[0]);
	var performer_num=parseInt(temp[1]);
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
			performers = (str.replace(/"/g,"")).split('|');
			performers.pop();
			$(function() {
				$( "#r"+role_num+"_performer"+performer_num+"_Name" ).autocomplete({
					source: performers
				});
			});
		}
	};
	xhttp.open("GET", "/cgi-bin/list_person.php", true);
	xhttp.send();
}
var in_performer=function(sender){
	temp = sender.split('|');
	var role_num=parseInt(temp[0]);
	var performer_num=parseInt(temp[1]);
	var result=[];
	var str=(document.getElementById("r"+role_num+"_performer"+performer_num+"_Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	if (str=="") {return;}
	else {
		str=str+"@";
		temp = str.split('@');
		var name=temp[0];
		var nickname=temp[1];
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
				if (result[0]=="meiyou") {return 0;};
				document.getElementById("r"+role_num+"_performer"+performer_num+"_EN_name").value= result[0];
				if (result[1]=="M") {
					document.getElementById("r"+role_num+"_performer"+performer_num+"_M").checked = true;
					document.getElementById("r"+role_num+"_performer"+performer_num+"_F").checked = false;
				}
				else if(result[1]=="F"){
					document.getElementById("r"+role_num+"_performer"+performer_num+"_F").checked = true;
					document.getElementById("r"+role_num+"_performer"+performer_num+"_M").checked = false;
				};
				if (result[2]=="Y") {
					document.getElementById("r"+role_num+"_performer"+performer_num+"_Y_NYCOS").checked = true;
					document.getElementById("r"+role_num+"_performer"+performer_num+"_N_NYCOS").checked = false;
					is_NYCOS(role_num+"|"+performer_num+"|1");
				}
				else if (result[2]=="N"){
					document.getElementById("r"+role_num+"_performer"+performer_num+"_N_NYCOS").checked = true;
					document.getElementById("r"+role_num+"_performer"+performer_num+"_Y_NYCOS").checked = false;
					is_NYCOS(role_num+"|"+performer_num+"|0");
				}
				document.getElementById("r"+role_num+"_performer"+performer_num+"_Youth").value= result[3];
				document.getElementById("r"+role_num+"_performer"+performer_num+"_Bio").value= result[4];
				document.getElementById("r"+role_num+"_performer"+performer_num+"_EN_bio").value= result[5];
				document.getElementById("r"+role_num+"_performer"+performer_num+"_Tel").value= result[6];
				document.getElementById("r"+role_num+"_performer"+performer_num+"_Email").value= result[7];
				document.getElementById("r"+role_num+"_performer"+performer_num+"_Remark").value= result[8];
			}
		};
		xhttp.open("GET", "/cgi-bin/person_info.php?name="+name+"&nickname="+nickname, true);
		xhttp.send();
	}
}

var check_filled=function() {
	var flag=1;
	for(var i=0;i<1;i++){
		for(var j=0;j<1;j++){
			if (document.getElementById("r"+i+"_performer"+j+"_Name").value==="" ||document.getElementById("r"+i+"_performer"+j+"_EN_name").value==="" ||document.getElementById("r"+i+"_performer"+j+"_Bio").value==="" ||document.getElementById("r"+i+"_performer"+j+"_EN_bio").value==="" ) {flag=0; return flag;}
			else if ((document.getElementById("r"+i+"_performer"+j+"_Name").value).indexOf("@")===0) {flag=0; return flag;}
		}
	}
	return flag;
}

var is_NYCOS=function(sender){
	var temp_array = sender.split('|');
	var role_num=parseInt(temp_array[0]);
	var performer_num=parseInt(temp_array[1]);
	var is =parseInt(temp_array[2]);
	temp="r"+role_num+"_performer"+performer_num+"_Youth";
	if (is==1) {	
		document.getElementById(temp).innerHTML='<option value="Y">Y</option><option value="N">N</option>';
	}
	else{
		document.getElementById(temp).innerHTML='<option value="N">N</option>';
	}
}


var send_back=function(sender){
	var Performer_Name_CN=new Array();
	var Performer_Nickname=new Array();
	var Performer_Name=new Array();
	var Gender=new Array();
	var NYCOS=new Array();
	var Youth=new Array();
	var Bios_CN=new Array();
	var Bios=new Array();
	var Tel=new Array();
	var Email=new Array();
	var Remark=new Array();
	var text;

	//# of roles
	for(var i=0;i<1;i++){
		Performer_Name_CN[i]=new Array();
		Performer_Nickname[i]=new Array();
		Performer_Name[i]=new Array();
		Gender[i]=new Array();
		NYCOS[i]=new Array();
		Youth[i]=new Array();
		Bios_CN[i]=new Array();
		Bios[i]=new Array();
		Tel[i]=new Array();
		Email[i]=new Array();
		Remark[i]=new Array();

		//# of pergormer needed for each role
		for(var j=0;j<1;j++){
			var str=(document.getElementById("r"+i+"_performer"+j+"_Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
			str=str+"@";
			temp = str.split('@');
			Performer_Name_CN[i].push(temp[0]);
			Performer_Nickname[i].push(temp[1]);
			Performer_Name[i].push(document.getElementById("r"+i+"_performer"+j+"_EN_name").value);

			if (document.getElementById("r"+i+"_performer"+j+"_M").checked == true) {str="M";}
			else{str="F";}
			Gender[i].push(str);

			if (document.getElementById("r"+i+"_performer"+j+"_Y_NYCOS").checked == true) {str="Y";}
			else{str="N";}
			NYCOS[i].push(str);

			Youth[i].push(document.getElementById("r"+i+"_performer"+j+"_Youth").value);
			Bios_CN[i].push(document.getElementById("r"+i+"_performer"+j+"_Bio").value);
			Bios[i].push(document.getElementById("r"+i+"_performer"+j+"_EN_bio").value);
			Tel[i].push(document.getElementById("r"+i+"_performer"+j+"_Tel").value);
			Email[i].push(document.getElementById("r"+i+"_performer"+j+"_Email").value);
			Remark[i].push(document.getElementById("r"+i+"_performer"+j+"_Remark").value);
		}
	}

	if (sender=="N") {
		$.ajax({
			method: "POST",
			url: "/cgi-bin/edit_person.php",
			data: {
				Performer_Name_CN:Performer_Name_CN,
				Performer_Nickname:Performer_Nickname,
				Performer_Name:Performer_Name,
				Gender:Gender,
				NYCOS:NYCOS,
				Youth:Youth,
				Bios_CN:Bios_CN,
				Bios:Bios,
				Tel:Tel,
				Email:Email,
				Remark:Remark
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