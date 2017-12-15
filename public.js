/******************************
***绑定事件的兼容写法
****** event 代表要绑定事件的元素　
****** type 代表要绑定的事件名（不含on）
****** fn 代表要绑定事件的函数
*******************************/


function addEvent(element,type,fn){
	if(element.addEventListener){
		element.addEventListener(type,fn,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,fn);
	}else{
		element["on"+type]=fn;
	}
}



/*******************************
解除事件的兼容写法
****** event 代表要绑定事件的元素　
****** type 代表要绑定的事件名（不含on）
****** fn 代表要绑定事件的函数
********************************/


function removeEvent(element,type,fn){
	if(element.removeEventListener){
		element.removeEventListener(type,fn,false);
	}else if(element.detachEvent){
		element.detachEvent("on"+type,fn);
	}else{
		element["on"+type]=null;
	}
}



/*******************************
取消冒泡的兼容写法
****** ev 代表要取消的事件对象　
****** 
********************************/
function stopBubble(ev){
	if(ev && ev.stopPropagation){
		ev.stopPropagation();
	}else{
		ev.cancelBubble=true;
	}
}



/*******************************
获取css里的计算后的样式兼容写法
****** 　
****** 
********************************/
function getStyle(element,key){
	if(element.currentStyle){
		return element.currentStyle[key];
	}else{
		return getComputedStyle(element,null)[key];
	}
}



/*******************************
改变body的scrollTop值的兼容写法,num为要赋给body的scrollTop值
****** 　
****** 
********************************/
function scrollTop(num){
	if(document.documentEleemnt.scrollTop){
		return document.documentEleemnt.scrollTop=num;
	}else{
		return document.body.scrollTop=num;
	}
}


/*******************************
基于火狐浏览器和非火狐浏览器的鼠标滚轮事件的兼容函数
****** 　
****** 
********************************/
function mousewheel(obj,fn){
	var res=window.navigator.userAgent.indexOf("Firefox");
	if(res==-1){//非火狐
		addEvent(obj,"mousewheel",wheel);
	}else{//火狐
		addEvent(obj,"DOMMouseScroll",wheel);
	}
	function wheel(ev){
		var evObj=window.event || ev;
		var down=true;
		if(ev.preventDefault){
			ev.preventDefault();
		}
		if(ev.detail){
			down=ev.detail<0;
		}else{
			down=ev.wheelDelta>0;
		}
		fn.apply(obj,[down,ev]);
	}
}

/*******************************
查找cookie值的方法
****** 　
****** key是带引号的cookie键
********************************/
function getCookie(key){
	var arr=document.cookie.split("; ");
	for(index in arr){
		var resArr=arr[index].split("=");
		if(resArr[0]==key){
			return resArr[1];
		}
	}
}
/*******************************
查找cookie值第二种封装的方法
****** 　
****** key是带引号的cookie键
********************************/
function getCookie2(key){
	var str=document.cookie;
	var len=key.length+1;
	var start=str.indexOf(key)+len;
	var end=str.indexOf(";",start)==-1?str.length:str.indexOf(";",start);
	var val=str.substring(start,end);
	return val;
}
/*******************************
查找父页面中传过来的参数
****** 　
****** name是带引号的参数名
********************************/
function GetQueryString(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null){
     	return  unescape(r[2]);
     }else{
     	return null;
     } 
}

/* 设置cookie */
function setCookie3(key,val,time){//设置cookie方法
	var date=new Date(); //获取当前时间
	var expiresDays=time;  //将date设置为n天以后的时间
	date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
	document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
}
function getCookie3(key){//获取cookie方法
	/*获取cookie参数*/
	var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
	var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
	var tips;  //声明变量tips
	for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
		var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
		if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
			tips=arr[1];   //将cookie的值赋给变量tips
			break;   //终止for循环遍历
		} 
	}
	return tips;
}
function clearCookie(name) {  
    setCookie(name, "", -1);  
} 


// 判断输入框中的值是否为空或空格
function isNull(str){
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	if(str.length == 0 || re.test(str)) {
		return false;
	} else {
		return true;
	}
}
//判断电话号码的正则表达式
function checkMobile(phoneNum) {
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phoneNum))) {
		return false;
	} else {
		return true;
	}
}
//判断固定电话格式的正则表达式函数
function checkTel(tel) {
	var arrNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for(i in tel) {
		if(arrNum.indexOf(tel[i]) == -1) {
			return false;
		}
	}
	return true;
}