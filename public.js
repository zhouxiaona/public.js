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
		return document.documentElement.scrollTop=num;
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
查找cookie值第二种封装的方法(PHP)
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
页面跳转中查找父页面中传过来的参数
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



/*******************************
设置cookie值，时间戳,与getCookie3()配套使用
****** 　
****** 
********************************/
function setCookie(key,val,time){
	var date=new Date(); //获取当前时间
	var expiresDays=time;  //将date设置为n天以后的时间
	date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
	document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
}


/*******************************
获取cookie值
****** 　与setCookie()配套使用
****** key是带引号的cookie名
********************************/
function getCookie3(key){
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



/*******************************
手动删除cookie值
****** 　
****** 与setCookie()、getCookie3(key)配套使用
********************************/
function clearCookie(name) {  
    setCookie(name, "", -1);  
} 


/*******************************
判断input输入框中的值是否为空或空格
****** 　
****** 正则表达式
********************************/
function isNull(str){
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	if(str.length == 0 || re.test(str)) {
		return false;
	} else {
		return true;
	}
}


/*******************************
判断电话号码的正则表达式
****** 　
****** 正则表达式
********************************/
function checkMobile(phoneNum) {
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phoneNum))) {
		return false;
	} else {
		return true;
	}
}


/*******************************
判断固定电话格式的函数
****** 　
****** 
********************************/
function checkTel(tel) {
	var arrNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for(i in tel) {
		if(arrNum.indexOf(tel[i]) == -1) {
			return false;
		}
	}
	return true;
}


/*******************************
判断DOM节点是否加载完成的兼容函数
****** 　
****** 如若加载完成,就执行fn函数
********************************/
function ready(fn){
	//如果浏览器支持addEventListener就调用，否则用其他方法；
	if(window.addEventListener){
		window.addEventListener("DOMContentLoaded",fn,false);
	}else{
		//获取头部节点；
		var head=document.getElementsByTagName("head")[0];
		var myScript=document.createElement("script");
		head.appendChild(myScript);
		//监控script标签是否创建成功，如果创建成功就执行arg()函数
		myScript.onreadystatechange=function(){
			if(myScript.readyState=="complete"){
				//script节点创建完成，执行fn()
				fn();
			}
		}
	}
}




/*******************************
getElementsByClassName()方法IE9以下不支持
****** 兼容函数　
****** 返回查找的元素,obj为所要查找目标元素的父级
********************************/
function findClass(className,obj){
	if(obj.getElementsByClassName){
		//主流浏览器支持getElementByClassName函数
		var eles=obj.getElementsByClassName(className);
	}else{
		//IE浏览器不支持
		var tags=document.getElementsByTagName("*");
		var eles=[];
		for(var i=0;i<tags.length;i++){
			var reg =new RegExp("\\b"+className+"\\b");
			if(reg.test(tags[i].className)){
				eles.push(tags[i]);
			}
		}
	}
	return eles;
}



