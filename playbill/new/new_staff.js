var string=window.location.search.substring(1);
var array=string.split('&');
var order = new Number(array[0]);
var time=array[1]+' '+array[2];

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
			var result = (str.replace(/"/g,"")).split('|');
			if (result[0]==1 && result[1]==order && result[2]==time) {return 0;}
			else{
				alert("请勿通过输入网址的方式访问本页面！将跳转至主页。");
				window.location.href = "/playbill";
			}
		}
	};
	xhttp.open("GET", "/cgi-bin/check_new.php", true);
	xhttp.send();
}
check();

var functs=[];
var get_funct=function(sender){
	var funct_num=parseInt(sender);
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
			//alert("xxx"+str);
			functs = (str.replace(/"/g,"")).split('|');
			functs.pop();
			$(function() {
				$( "#funct"+funct_num+"_Name" ).autocomplete({
					source: functs
				});
			});
		}
	};
	xhttp.open("GET", "/cgi-bin/list_funct.php", true);
	xhttp.send();
}

var in_funct=function(sender){
	var funct_num=parseInt(sender);
	var result=[];
	var funct=(document.getElementById("funct"+funct_num+"_Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	if(functs.indexOf(funct)>-1){
		flag=1;
	}
	else{flag=0;}
	if (funct=="") {return;}
	else {
		document.getElementById("funct"+funct_num+"_EN_name").value='';
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
					document.getElementById("funct"+funct_num+"_EN_name").value= result[0];
				}
			};
			xhttp.open("GET", "/cgi-bin/funct_info.php?funct="+funct, true);
			xhttp.send();
		}
	}
}

var staffs=[];
var get_staff=function(sender){
	var temp = sender.split('|');
	var funct_num=parseInt(temp[0]);
	var staff_num=parseInt(temp[1]);
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
			staffs = (str.replace(/"/g,"")).split('|');
			staffs.pop();
			$(function() {
				$( "#f"+funct_num+"_staff"+staff_num+"_Name" ).autocomplete({
					source: staffs
				});
			});
		}
	};
	xhttp.open("GET", "/cgi-bin/list_person.php", true);
	xhttp.send();
}
var in_staff=function(sender){
	var temp = sender.split('|');
	var funct_num=parseInt(temp[0]);
	var staff_num=parseInt(temp[1]);
	var result=[];
	var str=(document.getElementById("f"+funct_num+"_staff"+staff_num+"_Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
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
				//alert("f"+funct_num+"_staff"+staff_num+"_EN_name");
				document.getElementById("f"+funct_num+"_staff"+staff_num+"_EN_name").value= result[0];
			}
		};
		xhttp.open("GET", "/cgi-bin/person_info.php?name="+name+"&nickname="+nickname, true);
		xhttp.send();
	}
}
var funct_id=0
var staff_id=new Array();
staff_id[0]=0;
var temp="";
var add_funct=function(){
	funct_id++;
	staff_id[funct_id]=0;
	var newItem = document.createElement("div");
	newItem.id="funct"+funct_id;
	temp='◆職能'+(funct_id+1)+'<br><span style="display: inline-block;width: 80px;"><span style="color:red">*</span>職能: </span><input type="text" autofocus="focus" id="funct'+funct_id+'_Name" placeholder=" i.e. 服裝" style="height:20px;" onclick="get_funct(&quot;'+funct_id+'&quot;);" onkeyup="in_funct(&quot;'+funct_id+'&quot;);"><span style="display: inline-block;width: 100px; padding-left:50px;"><span style="color:red">*</span>Function</span><input type="text" id="funct'+funct_id+'_EN_name" style="height:20px;"><br>------------------------------------------<div id="f'+funct_id+'_staff_info"><div id="f'+funct_id+'_staff0">◆職能'+(funct_id+1)+'：人員1<br><span style="display: inline-block;"><span style="color:red">*</span>人員:(Name@Nickname) </span><input type="text" id="f'+funct_id+'_staff0_Name" placeholder=" i.e. 張曉茹" style="height:20px;" onclick="get_staff(&quot;'+funct_id+'|0&quot;);" onkeyup="in_staff(&quot;'+funct_id+'|0&quot;);">　must split by "@"<br><span style="display: inline-block;width: 100px;argin-bottom:15px;"><span style="color:red">*</span>Staff</span><input type="text" id="f'+funct_id+'_staff0_EN_name" style="height:20px;"><br></div><!-- i0_staff0 --><div class="new" id="funct'+funct_id+'_new_staff" style="margin-top:10px;">	<a href="javascript:add_staff(&quot;'+funct_id+'&quot;);">+人　員</a></div><div class="del" id="funct'+funct_id+'_del_staff">	<a href="javascript:del_staff(&quot;'+funct_id+'&quot;);">-人　員</a></div><br>------------------------------------------</div><!-- i0_staff_info -->';
	newItem.innerHTML=temp;
	document.getElementById('funct_info').insertBefore(newItem, document.getElementById("new_funct"));
}
var del_funct=function(){
	if (funct_id==0) {
		alert("At least one funct per performance!");
		return 0;
	};
	var elem = document.getElementById("funct"+funct_id);
	elem.parentNode.removeChild(elem);
	funct_id--;
}
var add_staff=function(sender){
	var funct_num=parseInt(sender);
	staff_id[funct_num]++;
	var newItem = document.createElement("div");
	newItem.id="f"+funct_num+"_staff"+staff_id[funct_num];
	temp='<br>◆職能'+(funct_num+1)+'：人員'+(staff_id[funct_num]+1)+'<br><span style="display: inline-block;"><span style="color:red">*</span>人員:(Name@Nickname) </span><input type="text" id="f'+funct_num+'_staff'+staff_id[funct_num]+'_Name" placeholder=" i.e. 張曉茹" style="height:20px;" onclick="get_staff(&quot;'+funct_num+'|'+staff_id[funct_num]+'&quot;);" onkeyup="in_staff(&quot;'+funct_num+'|'+staff_id[funct_num]+'&quot;);">　must split by "@"<br><span style="display: inline-block;width: 100px;argin-bottom:15px;"><span style="color:red">*</span>Staff</span><input type="text" id="f'+funct_num+'_staff'+staff_id[funct_num]+'_EN_name" style="height:20px;"><br>';
	newItem.innerHTML=temp;
	temp='f'+funct_num+'_staff_info';
	document.getElementById(temp).insertBefore(newItem, document.getElementById("funct"+funct_num+"_new_staff"));
}
var del_staff=function(sender){
	var funct_num=parseInt(sender);
	if (staff_id[funct_num]==0) {
		alert("At least one staff per funct!");
		return 0;
	};
	var elem = document.getElementById("f"+funct_num+"_staff"+staff_id[funct_num]);
	elem.parentNode.removeChild(elem);
	staff_id[funct_num]--;
}

var check_filled = function(){
	var flag=1;
	for(var i=0;i<funct_id+1;i++){
		if (document.getElementById("funct"+i+"_Name").value===""||document.getElementById("funct"+i+"_EN_name").value==="") {flag=0; return flag;}
		for(var j=0;j<staff_id[i]+1;j++){
			if (document.getElementById("f"+i+"_staff"+j+"_Name").value==="" ||document.getElementById("f"+i+"_staff"+j+"_EN_name").value==="") {flag=0; return flag;}
			else if ((document.getElementById("f"+i+"_staff"+j+"_Name").value).indexOf("@")===0) {flag=0; return flag;}
		}
	}
	return flag;
}

var send_back=function(){
	var funct_Name_CN=[];
	var funct_Name=[];
	var staff_Name_CN=new Array();
	var staff_Nickname=new Array();
	var staff_Name=new Array();
	for(var i=0;i<funct_id+1;i++){
		funct_Name_CN.push(document.getElementById("funct"+i+"_Name").value);
		funct_Name.push(document.getElementById("funct"+i+"_EN_name").value);

		staff_Name_CN[i]=new Array();
		staff_Nickname[i]=new Array();
		staff_Name[i]=new Array();

		//# of pergormer needed for each role
		for(var j=0;j<staff_id[i]+1;j++){
			var str=(document.getElementById("f"+i+"_staff"+j+"_Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
			str=str+"@";
			temp = str.split('@');
			staff_Name_CN[i].push(temp[0]);
			staff_Nickname[i].push(temp[1]);
			staff_Name[i].push(document.getElementById("f"+i+"_staff"+j+"_EN_name").value);
		}
	}

		$.ajax({
		method: "POST",
		url: "/cgi-bin/add_staff.php",
		data: {
			funct_id:funct_id,
			staff_id:staff_id,
			funct_Name_CN:funct_Name_CN,
			funct_Name:funct_Name,
			staff_Name_CN:staff_Name_CN,
			staff_Nickname:staff_Nickname,
			staff_Name:staff_Name,
		},
		success: function(data) {
			window.location.href = "/playbill/new/playbill.html?"+(order+1)+"&"+array[1]+'&'+array[2];
	    }
	})
}

var process=function(){
	if(check_filled()===0){
		document.getElementById("alert").innerHTML="ERROR! Required field incomplete!";
		return 0;
	}
	else{
		document.getElementById("alert").innerHTML="";
	}

	send_back();
}