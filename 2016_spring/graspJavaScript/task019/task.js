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
/**
 * 生成哈希类型的颜色字符串
 * @return {String} 颜色码
 */
function randomColor() {
    var color = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
    return color;
}



(function() {
    function init() {
        var inp = document.getElementById("input");
        var btnArr = document.querySelectorAll("button");
        var leIn = btnArr[0];
        var riIn = btnArr[1];
        var leOut = btnArr[2];
        var riOut = btnArr[3];
        var randomEle = btnArr[4];
        var bubble = btnArr[5];
        addEvent(leIn, "click", leftIn);
        addEvent(riIn, "click", rightIn);
        addEvent(leOut, "click", leftOut);
        addEvent(riOut, "click", rightOut);
        addEvent(randomEle, "click", rElement);
        addEvent(bubble, "click", oBubble);
    }
    var inp = document.getElementById("input");
    var list = document.getElementById("list");
    init();

    /**
     * 这里不在乎兼容性的话直接使用firstElementChild以及lastElementChild。
     * 非要使用获取子元素的方法的话，使用firstChild..等再判断节点类型为元素节点再进行添加删除等等。。（有些浏览器会把空白和文本节点算到里面，所以要判断）
     * 我为了偷懒就直接使用获取里面的li了。。
     *
     */

    function oBubble() {
        var childArr = list.querySelectorAll("li");
        var childArrHit = [];
        (function() {
            for (var i = 0, len = childArr.length; i < len; i++) {
                childArrHit.push(childArr[i].offsetHeight);
            }
        })();
        (function() {
            var temp;
            var arr = [];
            var timer = null;

            for (var i = 0, len = childArrHit.length; i < len; i++) {
                for (var j = 0; j < len + 1; j++) {
                    (function(j) {
                        setTimeout(function() {
                            if (childArrHit[j] > childArrHit[j + 1]) {
                                temp = childArrHit[j];
                                childArrHit[j] = childArrHit[j + 1];
                                childArrHit[j + 1] = temp;
                                childArr[j].style.height = childArrHit[j + 1] + "px";
                                childArr[j + 1].style.height = temp + "px";
                            }
                            arr.push(childArrHit[j], childArrHit[j + 1]);
                        }, 1000);
                    })(j);
                }
                // arr.push(temp);
                // childArr[i].style.height = temp + "px";
            }
            console.log(arr);
            console.log(childArrHit);

            // for (var o = 0; o < arr.length; o++) {
            // var jj = 0;
            //     for (var k =arr.length ; k > 1 ; k--) {
            //         childArr[jj].style.height = arr[k] + "px";
            //         childArr[jj+1].style.height = arr[k] + "px";
            //         jj++;
            //         if(jj>=childArr.length){
            //             jj=0;
            //         }
            //     }
            // }

        })();

    }

    function rElement() {
        var str = "";
        var num = null;
        for (var i = 0; i < 40; i++) {
            num = Math.round(Math.random() * 499 + 1);
            str += "<li style ='background:" + randomColor() + ";height:" + num + "px;'></li>";
        }
        list.innerHTML = str;
    }

    function leftIn() {
        var value = parseInt(trim(inp.value));
        var fiChild = list.firstElementChild;
        var firstEle = document.createElement("li");
        if (value <= 500 && value > 0) {
            firstEle.style.height = value + "px";
            firstEle.style.background = randomColor();

            if (fiChild) {
                list.insertBefore(firstEle, fiChild);
            } else {
                list.appendChild(firstEle);
            }
        } else {
            alert("请输入一个数字并且在0-500之间");
        }
    }

    function rightIn() {
        var value = parseInt(trim(inp.value));
        var lastEle = document.createElement("li");
        if (value <= 500 && value > 0) {
            lastEle.style.height = value + "px";
            lastEle.style.background = randomColor();
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
