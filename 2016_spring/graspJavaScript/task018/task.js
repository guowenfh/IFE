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
var inp = document.getElementById("input");
var list = document.getElementById("list");
init();


/**
 *  这里不在乎兼容性的话直接使用firstElementChild以及lastElementChild。
 *  非要使用获取子元素的方法的话，使用firstChild..等再判断节点类型为元素节点再进行添加删除等等。。（有些浏览器会把空白和文本节点算到里面，所以要判断）
 *  我为了偷懒就直接使用获取里面的li了。。
 */

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
    if (fiChild) {
        if (confirm("第一个元素的值为：" + fiChild.innerText + "，你确定要删除吗？")) {
            list.removeChild(fiChild);
        }
    } else {
        alert("队列是空的");
    }
}

function rightOut() {
    var Child = list.querySelectorAll("li");
    var latChild = Child[Child.length-1];
    if (latChild) {
        if (confirm("最后一个元素的值为：" + latChild.innerText + "，你确定要删除吗？")) {
            list.removeChild(latChild);
        }
    } else {
        alert("队列是空的");
    }
}
