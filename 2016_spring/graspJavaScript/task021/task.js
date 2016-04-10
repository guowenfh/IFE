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

(function() {
    var inp = document.getElementById("input"),
        list = document.getElementById("list"),
        searchInp = document.getElementById("search-inp");

    function init() {
        var btnArr = document.querySelectorAll("button"),
            leIn = btnArr[0],
            riIn = btnArr[1],
            leOut = btnArr[2],
            riOut = btnArr[3],
            searchBtn = document.getElementById("search-btn");


        addEvent(leIn, "click", leftIn);
        addEvent(riIn, "click", rightIn);
        addEvent(leOut, "click", leftOut);
        addEvent(riOut, "click", rightOut);
        addEvent(searchBtn, "click", searchFun);
    }
    init();

    /**
     * 这里不在乎兼容性的话直接使用firstElementChild以及lastElementChild。
     * 非要使用获取子元素的方法的话，使用firstChild..等再判断节点类型为元素节点再进行添加删除等等。。（有些浏览器会把空白和文本节点算到里面，所以要判断）
     * 我为了偷懒就直接使用获取里面的li了。。
     *
     */
    function searchFun() {
        var sValue = trim(searchInp.value),
            reg = new RegExp(sValue+"+", "i"),
            listArr = list.querySelectorAll("li"),
            sValueMatch = null;
        if (sValue !== "" && listArr.length !== 0) {
            for (var i = 0, len = listArr.length; i < len; i++) {
                sValueMatch = listArr[i].innerText.match(reg);
                if (sValueMatch) {
                console.log(sValueMatch);
                    if (sValueMatch.index === 0) {
                        listArr[i].innerHTML = "<span class='red'>" + sValueMatch[0] + "</span>" + sValueMatch.input.substr(sValueMatch[0].length);
                    } else {
                        console.log(sValueMatch[0]);
                        console.log(sValueMatch.input.substr(sValueMatch.index+sValueMatch[0].length));
                        listArr[i].innerHTML = sValueMatch.input.substring(0, sValueMatch.index) + "<span class='red'>" + sValueMatch[0] + "</span>" + sValueMatch.input.substr(sValueMatch.index+sValueMatch[0].length);
                    }
                    listArr[i].style.background = "#C9E8FF";
                } else {
                    listArr[i].innerHTML = listArr[i].innerText;
                    listArr[i].style.background = "#fff";
                }
            }
        } else {
            alert("当前列表中无值或者您未输入值");
        }
    }
    /*
        左侧入
     */
    function leftIn() {
        var value = trim(inp.value),
            fiChild = null,
            fistEle = null;
        if (!!value) {
            value = value.split(/[^\w\u4e00-\u9fa5]+/);
            for (var i = 0, len = value.length; i < len; i++) {
                fiChild = list.firstElementChild;
                if (value[i] !== "") {
                    fistEle = document.createElement("li");
                    fistEle.innerHTML = value[i];
                    if (fiChild) {
                        list.insertBefore(fistEle, fiChild);
                    } else {
                        list.appendChild(fistEle);
                    }
                }
            }
        } else {
            alert("请输入内容");
        }
    }
    /*
        右侧入
    */
    function rightIn() {
        var value = trim(inp.value),
            lastEle = document.createElement("li");
        if (!!value) {
            value = value.split(/[^\w\u4e00-\u9fa5]+/);
            for (var i = 0, len = value.length; i < len; i++) {
                if (value[i] !== "") {
                    lastEle = document.createElement("li");
                    lastEle.innerHTML = value[i];
                    list.appendChild(lastEle);
                }
            }
        } else {
            alert("请输入内容");
        }
    }
    /*
        左侧出
    */
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
    /*
    右侧出
     */
    function rightOut() {
        var Child = list.querySelectorAll("li");
        var latChild = Child[Child.length - 1];
        if (latChild) {
            if (confirm("最后一个元素的值为：" + latChild.innerText + "，你确定要删除吗？")) {
                list.removeChild(latChild);
            }
        } else {
            alert("队列是空的");
        }
    }

})();
