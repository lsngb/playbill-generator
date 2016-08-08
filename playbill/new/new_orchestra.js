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

var instruments=[];
var get_instrument=function(sender){
	var instrument_num=parseInt(sender);
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
			instruments = (str.replace(/"/g,"")).split('|');
			instruments.pop();
			$(function() {
				$( "#instrument"+instrument_num+"_Name" ).autocomplete({
					source: instruments
				});
			});
		}
	};
	xhttp.open("GET", "/cgi-bin/list_instrument.php", true);
	xhttp.send();
}

var in_instrument=function(sender){
	var instrument_num=parseInt(sender);
	var result=[];
	var instrument=(document.getElementById("instrument"+instrument_num+"_Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	if(instruments.indexOf(instrument)>-1){
		flag=1;
	}
	else{flag=0;}
	if (instrument=="") {return;}
	else {
		document.getElementById("instrument"+instrument_num+"_EN_name").value='';
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
					document.getElementById("instrument"+instrument_num+"_EN_name").value= result[0];
				}
			};
			xhttp.open("GET", "/cgi-bin/instrument_info.php?instrument="+instrument, true);
			xhttp.send();
		}
	}
}

var players=[];
var get_player=function(sender){
	var temp = sender.split('|');
	var instrument_num=parseInt(temp[0]);
	var player_num=parseInt(temp[1]);
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
			players = (str.replace(/"/g,"")).split('|');
			players.pop();
			$(function() {
				$( "#i"+instrument_num+"_player"+player_num+"_Name" ).autocomplete({
					source: players
				});
			});
		}
	};
	xhttp.open("GET", "/cgi-bin/list_person.php", true);
	xhttp.send();
}
var in_player=function(sender){
	var temp = sender.split('|');
	var instrument_num=parseInt(temp[0]);
	var player_num=parseInt(temp[1]);
	var result=[];
	var str=(document.getElementById("i"+instrument_num+"_player"+player_num+"_Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
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
				//alert("i"+instrument_num+"_player"+player_num+"_EN_name");
				document.getElementById("i"+instrument_num+"_player"+player_num+"_EN_name").value= result[0];
			}
		};
		xhttp.open("GET", "/cgi-bin/person_info.php?name="+name+"&nickname="+nickname, true);
		xhttp.send();
	}
}
var instrument_id=0
var player_id=new Array();
player_id[0]=0;
var temp="";
var add_instrument=function(){
	instrument_id++;
	player_id[instrument_id]=0;
	var newItem = document.createElement("div");
	newItem.id="instrument"+instrument_id;
	temp='◆樂器'+(instrument_id+1)+'<br><span style="display: inline-block;width: 80px;"><span style="color:red">*</span>樂器: </span><input type="text" autofocus="focus" id="instrument'+instrument_id+'_Name" placeholder=" i.e. 京胡" style="height:20px;" onclick="get_instrument(&quot;'+instrument_id+'&quot;);" onkeyup="in_instrument(&quot;'+instrument_id+'&quot;);"><span style="display: inline-block;width: 100px; padding-left:50px;"><span style="color:red">*</span>Instrument</span><input type="text" id="instrument'+instrument_id+'_EN_name" style="height:20px;"><br>------------------------------------------<div id="i'+instrument_id+'_player_info"><div id="i'+instrument_id+'_player0">◆樂器'+(instrument_id+1)+'：演奏者1<br><span style="display: inline-block;"><span style="color:red">*</span>演奏者:(Name@Nickname) </span><input type="text" id="i'+instrument_id+'_player0_Name" placeholder=" i.e. 曹祥生" style="height:20px;" onclick="get_player(&quot;'+instrument_id+'|0&quot;);" onkeyup="in_player(&quot;'+instrument_id+'|0&quot;);">　must split by "@"<br><span style="display: inline-block;width: 100px;argin-bottom:15px;"><span style="color:red">*</span>Player</span><input type="text" id="i'+instrument_id+'_player0_EN_name" style="height:20px;"><br></div><!-- i0_player0 --><div class="new" id="instrument'+instrument_id+'_new_player" style="margin-top:10px;">	<a href="javascript:add_player(&quot;'+instrument_id+'&quot;);">+演奏者</a></div><div class="del" id="instrument'+instrument_id+'_del_player">	<a href="javascript:del_player(&quot;'+instrument_id+'&quot;);">-演奏者</a></div><br>------------------------------------------</div><!-- i0_player_info -->';
	newItem.innerHTML=temp;
	document.getElementById('instrument_info').insertBefore(newItem, document.getElementById("new_instrument"));
}
var del_instrument=function(){
	if (instrument_id==0) {
		alert("At least one instrument per performance!");
		return 0;
	};
	var elem = document.getElementById("instrument"+instrument_id);
	elem.parentNode.removeChild(elem);
	instrument_id--;
}
var add_player=function(sender){
	var instrument_num=parseInt(sender);
	player_id[instrument_num]++;
	var newItem = document.createElement("div");
	newItem.id="i"+instrument_num+"_player"+player_id[instrument_num];
	temp='<br>◆樂器'+(instrument_num+1)+'：演奏者'+(player_id[instrument_num]+1)+'<br><span style="display: inline-block;"><span style="color:red">*</span>演奏者:(Name@Nickname) </span><input type="text" id="i'+instrument_num+'_player'+player_id[instrument_num]+'_Name" placeholder=" i.e. 曹祥生" style="height:20px;" onclick="get_player(&quot;'+instrument_num+'|'+player_id[instrument_num]+'&quot;);" onkeyup="in_player(&quot;'+instrument_num+'|'+player_id[instrument_num]+'&quot;);">　must split by "@"<br><span style="display: inline-block;width: 100px;argin-bottom:15px;"><span style="color:red">*</span>Player</span><input type="text" id="i'+instrument_num+'_player'+player_id[instrument_num]+'_EN_name" style="height:20px;"><br>';
	newItem.innerHTML=temp;
	temp='i'+instrument_num+'_player_info';
	document.getElementById(temp).insertBefore(newItem, document.getElementById("instrument"+instrument_num+"_new_player"));
}
var del_player=function(sender){
	var instrument_num=parseInt(sender);
	if (player_id[instrument_num]==0) {
		alert("At least one player per instrument!");
		return 0;
	};
	var elem = document.getElementById("i"+instrument_num+"_player"+player_id[instrument_num]);
	elem.parentNode.removeChild(elem);
	player_id[instrument_num]--;
}

var check_filled = function(){
	var flag=1;
	for(var i=0;i<instrument_id+1;i++){
		if (document.getElementById("instrument"+i+"_Name").value===""||document.getElementById("instrument"+i+"_EN_name").value==="") {flag=0; return flag;}
		for(var j=0;j<player_id[i]+1;j++){
			if (document.getElementById("i"+i+"_player"+j+"_Name").value==="" ||document.getElementById("i"+i+"_player"+j+"_EN_name").value==="") {flag=0; return flag;}
			else if ((document.getElementById("i"+i+"_player"+j+"_Name").value).indexOf("@")===0) {flag=0; return flag;}
		}
	}
	return flag;
}

var send_back=function(){
	var Instrument_Name_CN=[];
	var Instrument_Name=[];
	var Player_Name_CN=new Array();
	var Player_Nickname=new Array();
	var Player_Name=new Array();
	for(var i=0;i<instrument_id+1;i++){
		Instrument_Name_CN.push(document.getElementById("instrument"+i+"_Name").value);
		Instrument_Name.push(document.getElementById("instrument"+i+"_EN_name").value);

		Player_Name_CN[i]=new Array();
		Player_Nickname[i]=new Array();
		Player_Name[i]=new Array();

		//# of pergormer needed for each role
		for(var j=0;j<player_id[i]+1;j++){
			var str=(document.getElementById("i"+i+"_player"+j+"_Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
			str=str+"@";
			temp = str.split('@');
			Player_Name_CN[i].push(temp[0]);
			Player_Nickname[i].push(temp[1]);
			Player_Name[i].push(document.getElementById("i"+i+"_player"+j+"_EN_name").value);
		}
	}

		$.ajax({
		method: "POST",
		url: "/cgi-bin/add_orchestra.php",
		data: {
			instrument_id:instrument_id,
			player_id:player_id,
			Instrument_Name_CN:Instrument_Name_CN,
			Instrument_Name:Instrument_Name,
			Player_Name_CN:Player_Name_CN,
			Player_Nickname:Player_Nickname,
			Player_Name:Player_Name,
		},
		success: function(data) {
			window.location.href = "/playbill/new/new_staff.html?"+(order+1)+"&"+array[1]+'&'+array[2];
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