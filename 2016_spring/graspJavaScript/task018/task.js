/**
 * 事件添加函数
 * @param { Element  } ele     触发事件的Dom对象
 * @param { String   } event   触发的事件类型
 * @param { Fucntion } func    事件触发执行的函数
 */
var addEvent = (function() {
    if (document.addEventListener) {
        return function(ele, event, func) {
            ele.addEventListener(event, func, false);
        };
    } else if (document.attachEvent) {
        return function(ele, event, func) {
            ele.attachEvent("on" + event, func);
        };
    } else {
        return function(ele, event, func) {
            ele["on" + event] = func;
        };
    }
})();

/**
 * 字符串去首尾空格
 * @param  {String} str     待处理字符串
 * @return {String}         处理后的字符串
 */
function trim(str) {
    // your implement
    var result = "";
    result = str.replace(/^\s+|\s+$/g, ""); //使用正则进行字符串替换
    return result;
}


function init() {
    var inp = document.getElementById("input");
    var btnArr = document.querySelectorAll("button");
    var leIn = btnArr[0];
    var riIn = btnArr[1];
    var leOut = btnArr[2];
    var riOut = btnArr[3];

    addEvent(leIn, "click", leftIn);
    addEvent(riIn, "click", rightIn);
    addEvent(leOut, "click", leftOut);
    addEvent(riOut, "click", rightOut);
}

init();
var inp = document.getElementById("input");
var list = document.getElementById("list");

function leftIn() {
    var value = parseFloat(trim(inp.value));
    var fiChild = list.querySelectorAll("li")[0];
    var fistEle = document.createElement("li");
    if (!!value) {
        fistEle.innerHTML = value;
        if (fiChild) {
            list.insertBefore(fistEle, fiChild);
        } else {
            list.appendChild(fistEle);
        }
    } else {
        alert("请输入一个数字");
    }
}

function rightIn() {
    var value = parseFloat(trim(inp.value));
    var lastEle = document.createElement("li");
    if (!!value) {
        lastEle.innerHTML = value;
        list.appendChild(lastEle);
    } else {
        alert("请输入一个数字");
    }
}

function leftOut() {
    var fiChild = list.querySelectorAll("li")[0];
    if(fiChild){

        confirm(function(){
        fiChild.remove();

        });
    }else{

    }
}

function rightOut() {

}
