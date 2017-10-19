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
