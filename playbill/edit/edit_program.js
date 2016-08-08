var string="&"+window.location.search.substring(1);
var array=string.split('&'); 
var time=array[1]+' '+array[2];

document.getElementById("title").innerHTML="修改劇目";
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

var roles=[];
var get_role=function(sender){
	var role_num=parseInt(sender);
	var part=(document.getElementById("Part").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var program=(document.getElementById("Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	//alert(part+" "+program);
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
			roles = (str.replace(/"/g,"")).split('|');
			//alert(roles);
			roles.pop();
			$(function() {
				$( "#role"+role_num+"_Role" ).autocomplete({
					source: roles
				});
			});
		}
	};
	xhttp.open("GET", "/cgi-bin/list_role.php?program="+program+"&part="+part, true);
	xhttp.send();
}

var in_role=function(sender){
	var role_num=parseInt(sender);
	var result=[];
	var part=(document.getElementById("Part").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var program=(document.getElementById("Name").value).replace(/'/g, "＇").replace(/"/g, "＂");
	var role=(document.getElementById("role"+role_num+"_Role").value).replace(/'/g, "＇").replace(/"/g, "＂");
	if(roles.indexOf(role)>-1){
		flag=1;
	}
	else{flag=0;}
	if (role=="") {return;}
	else {
		document.getElementById("role"+role_num+"_EN_role").value='';
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
					//alert(result);
					document.getElementById("role"+role_num+"_EN_role").value= result[0];
					document.getElementById("role"+role_num+"_hangdang").value= result[1];
					document.getElementById("role"+role_num+"_Role_type").value= result[2];
				}
			};
			xhttp.open("GET", "/cgi-bin/role_info.php?program="+program+"&part="+part+"&role="+role, true);
			xhttp.send();
		}
		else{
		}
	}
}

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

var role_id=0
var performer_id=new Array();
performer_id[0]=0;
var temp="";

var add_role=function(){
	role_id++;
	performer_id[role_id]=0;
	var newItem = document.createElement("div");
	newItem.id="role"+role_id;
	if(document.getElementById("qing").checked == true){
		temp='◆角色'+(role_id+1)+'<br><span style="display: inline-block;width: 60px;"><span style="color:red">*</span>角色: </span><input type="text" id="role'+role_id+'_Role" placeholder=" i.e. 陳宮" style="height:20px;" onclick="get_role(&quot;'+role_id+'&quot;);" onkeyup="in_role(&quot;'+role_id+'&quot;);"><br><span style="display: inline-block;width: 60px;"><span style="color:red">*</span>Role: </span><input type="text" id="role'+role_id+'_EN_role" style="height:20px;"><br><span style="display: inline-block;width: 60px;">行當: </span><input type="text" id="role'+role_id+'_hangdang" style="height:20px;"><br><div style="margin-bottom: -10px;"><span style="color:red">*</span>角色類型: <select id="role'+role_id+'_Role_type" style="height:20px;">	<option value="清唱">清唱</option></select></div>------------------------------------------<div id="r'+role_id+'_performer_info"><div id="r'+role_id+'_performer0">◆角色'+(role_id+1)+'：演員1<br><span style="color:red">*</span>姓名(@Nickname): <input type="text" id="r'+role_id+'_performer0_Name" placeholder=" i.e. 呂維忠" style="height:20px;" onclick="get_performer(&quot;'+role_id+'|0&quot;);" onkeyup="in_performer(&quot;'+role_id+'|0&quot;)"> must split by "@"<br><span style="color:red">*</span>Name: <input type="text" id="r'+role_id+'_performer0_EN_name" style="height:20px;"><form id="r'+role_id+'_performer0_Gender" style="display: inline;padding-left:40px;"><span style="color:red">*</span>Gender:	<input type="radio" name="type" id="r'+role_id+'_performer0_M" value="M" checked> M<input type="radio" name="type" id="r'+role_id+'_performer0_F" value="F"> F</form><br><form id="r'+role_id+'_performer0_NYCOS" style="display: inline;"><span style="color:red">*</span>NYCOS: <input type="radio" name="type" value="Y" id="r'+role_id+'_performer0_Y_NYCOS" checked onclick="is_NYCOS(&quot;'+role_id+'|0|1&quot;);"> Y	<input type="radio" name="type" value="N" id="r'+role_id+'_performer0_N_NYCOS" onclick="is_NYCOS(&quot;'+role_id+'|0|0&quot;);"> N</form><span style="color:red;padding-left:60px;">*</span>Youth: <select id="r'+role_id+'_performer0_Youth" style="height:20px;">	<option value="Y">Y</option><option value="N">N</option></select><br><span style="color:red">*</span>演員簡介: <br><textarea wrap="on" id="r'+role_id+'_performer0_Bio" style="height:60px;width:600px;margin-bottom: -5px;"></textarea><br><span style="color:red">*</span>Bio: <br><textarea wrap="on" id="r'+role_id+'_performer0_EN_bio" style="height:130px;width:600px;"></textarea><br><span style="display: inline-block;width: 60px;">Tel:</span> <input type="text" placeholder=" i.e. XXX-XXX-XXXX" id="r'+role_id+'_performer0_Tel" style="height:20px;"><br><span style="display: inline-block;width: 60px;">Email:</span><input type="text" placeholder=" i.e. XX@XXX.XXX" id="r'+role_id+'_performer0_Email" style="height:20px;"><br><span style="display: inline-block;width: 60px;">Remark:</span><input type="text" id="r'+role_id+'_performer0_Remark" style="height:20px;"></div><!--r0_performer0--><div class="new" id="role'+role_id+'_new_performer" style="margin-top:10px;"><a href="javascript:add_performer(&quot;'+role_id+'&quot;);">+演員</a></div><div class="del" id="role0_del_performer"><a href="javascript:del_performer(&quot;'+role_id+'&quot;);">-演員</a></div><br>------------------------------------------</div><!--performer_info-->';
	}
	else{
		temp='◆角色'+(role_id+1)+'<br><span style="display: inline-block;width: 60px;"><span style="color:red">*</span>角色: </span><input type="text" id="role'+role_id+'_Role" placeholder=" i.e. 陳宮" style="height:20px;" onclick="get_role(&quot;'+role_id+'&quot;);" onkeyup="in_role(&quot;'+role_id+'&quot;);"><br><span style="display: inline-block;width: 60px;"><span style="color:red">*</span>Role: </span><input type="text" id="role'+role_id+'_EN_role" style="height:20px;"><br><span style="display: inline-block;width: 60px;">行當: </span><input type="text" id="role'+role_id+'_hangdang" style="height:20px;"><br><div style="margin-bottom: -10px;"><span style="color:red">*</span>角色類型: <select id="role'+role_id+'_Role_type" style="height:20px;">		<option value="主角">主角</option><option value="配角">配角</option><option value="龍套">龍套</option></select></div>------------------------------------------<div id="r'+role_id+'_performer_info"><div id="r'+role_id+'_performer0">◆角色'+(role_id+1)+'：演員1<br><span style="color:red">*</span>姓名(@Nickname): <input type="text" id="r'+role_id+'_performer0_Name" placeholder=" i.e. 呂維忠" style="height:20px;" onclick="get_performer(&quot;'+role_id+'|0&quot;);" onkeyup="in_performer(&quot;'+role_id+'|0&quot;)"> must split by "@"<br><span style="color:red">*</span>Name: <input type="text" id="r'+role_id+'_performer0_EN_name" style="height:20px;"><form id="r'+role_id+'_performer0_Gender" style="display: inline;padding-left:40px;"><span style="color:red">*</span>Gender:	<input type="radio" name="type" id="r'+role_id+'_performer0_M" value="M" checked> M<input type="radio" name="type" id="r'+role_id+'_performer0_F" value="F"> F</form><br><form id="r'+role_id+'_performer0_NYCOS" style="display: inline;"><span style="color:red">*</span>NYCOS: <input type="radio" name="type" value="Y" id="r'+role_id+'_performer0_Y_NYCOS" checked onclick="is_NYCOS(&quot;'+role_id+'|0|1&quot;);"> Y	<input type="radio" name="type" value="N" id="r'+role_id+'_performer0_N_NYCOS" onclick="is_NYCOS(&quot;'+role_id+'|0|0&quot;);"> N</form><span style="color:red;padding-left:60px;">*</span>Youth: <select id="r'+role_id+'_performer0_Youth" style="height:20px;">	<option value="Y">Y</option><option value="N">N</option></select><br><span style="color:red">*</span>演員簡介: <br><textarea wrap="on" id="r'+role_id+'_performer0_Bio" style="height:60px;width:600px;margin-bottom: -5px;"></textarea><br><span style="color:red">*</span>Bio: <br><textarea wrap="on" id="r'+role_id+'_performer0_EN_bio" style="height:130px;width:600px;"></textarea><br><span style="display: inline-block;width: 60px;">Tel:</span> <input type="text" placeholder=" i.e. XXX-XXX-XXXX" id="r'+role_id+'_performer0_Tel" style="height:20px;"><br><span style="display: inline-block;width: 60px;">Email:</span> <input type="text" placeholder=" i.e. XX@XXX.XXX" id="r'+role_id+'_performer0_Email" style="height:20px;"><br><span style="display: inline-block;width: 60px;">Remark:</span> <input type="text" id="r'+role_id+'_performer0_Remark" style="height:20px;"></div><!--r0_performer0--><div class="new" id="role'+role_id+'_new_performer" style="margin-top:10px;"><a href="javascript:add_performer(&quot;'+role_id+'&quot;);">+演員</a></div><div class="del" id="role0_del_performer"><a href="javascript:del_performer(&quot;'+role_id+'&quot;);">-演員</a></div><br>------------------------------------------</div><!--performer_info-->';
	}
	newItem.innerHTML=temp;
	document.getElementById('role_info').insertBefore(newItem, document.getElementById("new_role"));
}
var del_role=function(){
	if (role_id==0) {
		alert("At least one role per program!");
		return 0;
	};
	var elem = document.getElementById("role"+role_id);
	elem.parentNode.removeChild(elem);
	role_id--;
}
var add_performer=function(sender){
	var role_num=parseInt(sender);
	performer_id[role_num]++;
	var newItem = document.createElement("div");
	newItem.id="r"+role_num+"_performer"+performer_id[role_num];
	temp='<br>◆角色'+(role_num+1)+'：演員'+(performer_id[role_num]+1)+'<br><span style="color:red">*</span>姓名(@Nickname): <input type="text" id="r'+role_num+'_performer'+performer_id[role_num]+'_Name" placeholder=" i.e. 呂維忠" style="height:20px;" onclick="get_performer(&quot;'+role_num+'|'+performer_id[role_num]+'&quot;);" onkeyup="in_performer(&quot;'+role_num+'|'+performer_id[role_num]+'&quot;)"> must split by "@"<br><span style="color:red">*</span>Name: <input type="text" id="r'+role_num+'_performer'+performer_id[role_num]+'_EN_name" style="height:20px;"><form id="r'+role_num+'_performer'+performer_id[role_num]+'_Gender" style="display: inline;padding-left:40px;"><span style="color:red">*</span>Gender:	<input type="radio" name="type" id="r'+role_num+'_performer'+performer_id[role_num]+'_M" value="M" checked> M	<input type="radio" name="type" id="r'+role_num+'_performer'+performer_id[role_num]+'_F" value="F"> F</form><br><form id="r'+role_num+'_performer'+performer_id[role_num]+'_NYCOS" style="display: inline;"><span style="color:red">*</span>NYCOS: <input type="radio" name="type" value="Y" id="r'+role_num+'_performer'+performer_id[role_num]+'_Y_NYCOS" checked onclick="is_NYCOS(&quot;'+role_num+'|'+performer_id[role_num]+'|1&quot;);"> Y	<input type="radio" name="type" value="N" id="r'+role_num+'_performer'+performer_id[role_num]+'_N_NYCOS" onclick="is_NYCOS(&quot;'+role_num+'|'+performer_id[role_num]+'|0&quot;);"> N</form><span style="color:red;padding-left:60px;">*</span>Youth: <select id="r'+role_num+'_performer'+performer_id[role_num]+'_Youth" style="height:20px;"><option value="Y">Y</option>	<option value="N">N</option></select><br><span style="color:red">*</span>演員簡介: <br><textarea wrap="on" id="r'+role_num+'_performer'+performer_id[role_num]+'_Bio" style="height:60px;width:600px;margin-bottom: -5px;"></textarea><br><span style="color:red">*</span>Bio: <br><textarea wrap="on" id="r'+role_num+'_performer'+performer_id[role_num]+'_EN_bio" style="height:130px;width:600px;"></textarea><br><span style="display: inline-block;width: 60px;">Tel:</span> <input type="text" placeholder=" i.e. XXX-XXX-XXXX" id="r'+role_num+'_performer'+performer_id[role_num]+'_Tel" style="height:20px;"><br><span style="display: inline-block;width: 60px;">Email:</span> <input type="text" placeholder=" i.e. XX@XXX.XXX" id="r'+role_num+'_performer'+performer_id[role_num]+'_Email" style="height:20px;"><br><span style="display: inline-block;width: 60px;">Remark:</span> <input type="text" id="r'+role_num+'_performer'+performer_id[role_num]+'_Remark" style="height:20px;">';
	newItem.innerHTML=temp;
	temp='r'+role_num+'_performer_info';
	document.getElementById(temp).insertBefore(newItem, document.getElementById("role"+role_num+"_new_performer"));
}
var del_performer=function(sender){
	var role_num=parseInt(sender);
	if (performer_id[role_num]==0) {
		alert("At least one performer per role!");
		return 0;
	};
	var elem = document.getElementById("r"+role_num+"_performer"+performer_id[role_num]);
	elem.parentNode.removeChild(elem);
	performer_id[role_num]--;
}

var get_radio=function(){
	if(document.getElementById("qing").checked == true){
		for (var i = 0; i <role_id+1; i++) {
			temp="role"+i+"_Role_type";
			document.getElementById(temp).innerHTML='<option value="清唱">清唱</option>';
		};
		
	}
	else{
		for (var i = 0; i <role_id+1; i++) {
			temp="role"+i+"_Role_type";
			document.getElementById(temp).innerHTML='<option value=0>主角</option><option value=1>配角</option><option value=2>龍套</option>';
		};
	}
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

var check_filled=function() {
	var flag=1;
	if (document.getElementById("Name").value==="" ||document.getElementById("EN_name").value==="" ||document.getElementById("Part").value==="" ||document.getElementById("Synopsis").value==="" ||document.getElementById("EN_synopsis").value==="") {flag=0; return flag;}
	//console.log("role_id: "+role_id);
	for(var i=0;i<role_id+1;i++){
		if (document.getElementById("role"+i+"_Role").value===""||document.getElementById("role"+i+"_EN_role").value==="") {flag=0; return flag;}
		for(var j=0;j<performer_id[i]+1;j++){
			if (document.getElementById("r"+i+"_performer"+j+"_Name").value==="" ||document.getElementById("r"+i+"_performer"+j+"_EN_name").value==="" ||document.getElementById("r"+i+"_performer"+j+"_Bio").value==="" ||document.getElementById("r"+i+"_performer"+j+"_EN_bio").value==="" ) {flag=0; return flag;}
			else if ((document.getElementById("r"+i+"_performer"+j+"_Name").value).indexOf("@")===0) {flag=0; return flag;}
		}
	}
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

	var Role_Name_CN=[];
	var Role_Name=[];
	var Hangdang=[];
	var Role_type=[];
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
	for(var i=0;i<role_id+1;i++){
		Role_Name_CN.push(document.getElementById("role"+i+"_Role").value);
		Role_Name.push(document.getElementById("role"+i+"_EN_role").value);
		Hangdang.push(document.getElementById("role"+i+"_hangdang").value);
		Role_type.push(document.getElementById("role"+i+"_Role_type").value);

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
		for(var j=0;j<performer_id[i]+1;j++){
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
			url: "/cgi-bin/create_program.php",
			data: {
				role_id:role_id,
				performer_id:performer_id,
				CN_Name:CN_Name,
				Name:Name,
				CN_Part:CN_Part,
				Part:Part,
				Program_type:Program_type,
				CN_Synopsis:CN_Synopsis,
				Synopsis:Synopsis,
				Role_Name_CN:Role_Name_CN,
				Role_Name:Role_Name,
				Hangdang:Hangdang,
				Role_type:Role_type,
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

var del_program=function(){
	var r = confirm("Are you sure to DELETE this program?");
	if (r == true) {
	    $.ajax({
			method: "POST",
			url: "/cgi-bin/delete_program.php",
			data: {
				CN_Name:CN_Name,
				CN_Part:CN_Part,
			},
			success: function(data) {
				window.location.href = "playbill.html?"+array[1]+'&'+array[2];
	    	}
		})
	} else {
	    
	}
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