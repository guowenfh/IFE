(function() {
    var arr = [];
    //tag输入框
    function tagInpFun(value, obj) {
        if (value !== "" && arr.indexOf(value) === -1) {
            if (arr.length < 10) {
                arr.push(value);
            } else {
                arr.pop();
                arr.unshift(value);
            }
        }
        arrToHtml(obj, arr);
    }
    var interest = [];
    //处理兴趣列表
    function interestInpFun(value, obj) {
        //将输入分割成数组，并且进行去重操作
        var vArr = uniqArray(value.split(/\n|\s+|\,|\，|\、|\;|\；\。\./));
        if ((interest.length + vArr.length) > 0 && (interest.length + vArr.length) < 10) {
            interest = vArr;
        } else {
            interest = interest.concat(vArr);
            interest = uniqArray(interest);
            if (interest.length > 10) {
                interest = interest.slice(-10);
            }
        }
        arrToHtml(obj, interest);
    }
    /**
     * html渲染函数
     * @param  {HTMLElement} obj 用于渲染的容器
     * @param  {Array} arr 用于设置的内容
     */
    function arrToHtml(obj, arr) {
        obj.innerHTML = "";
        if (arr.length !== 0) {
            arr.forEach(function(ele, index) {
                if (index < 10) {
                    ele = ele.replace(/\n|\s+|\,|\，|\、|\;|\；\.\。/,'');
                    obj.innerHTML += "<li>" + ele + "</li>";
                }
            });
        }
    }
    /**
     * 设置hover效果，删除数组项并且重新渲染html
     * @param  {HTMLElement} obj [用来事件代理的html元素]
     * @param  {Array} arr [用于渲染html的数组]
     */
    function removeList(obj, arr) {
        addEvent(obj, "mouseover", function(ev) {
            if (ev.target.nodeName.toLowerCase() === "li") {
               var target = ev.target;
                target.innerHTML = "点击删除" + target.innerText;
                target.style.backgroundColor = "#DF4210";
            }
        });
        addEvent(obj, "mouseout", function(ev) {
            if (ev.target.nodeName.toLowerCase() === "li") {
                var target = ev.target;
                var asd = target.innerText;
                target.innerHTML = "";
                target.innerHTML = asd.substr(4);
                target.style.backgroundColor = "#4893E3";
            }
        });
        if (arr) {
            addEvent(obj, "mousedown", function(ev) {
                if (ev.target.nodeName.toLowerCase() === "li") {
                   var target = ev.target;
                    arr.splice(arr.indexOf(target.innerText.substr(4)), 1);
                    target.innerHTML = "";
                    arrToHtml(this, arr);
                }
            });
        }

    }

    function init() {
        var tagInp = document.getElementById("tag-inp"),
            interestInp = document.getElementById("interest-inp"),
            interestBtn = document.getElementById("interest-btn"),
            tagList = document.getElementById("tag-list"),
            interestList = document.getElementById("interest-list");

        addEvent(tagInp, "keydown", function(ev) {
            if (ev.keyCode === 13 || ev.keyCode === 186 || ev.keyCode === 188 || ev.keyCode === 32) {
                tagInpFun(trim(tagInp.value), tagList);
                this.value = "";
            }
        });
        removeList(tagList, arr);
        addEvent(interestBtn, "click", function() {
            interestInpFun(trim(interestInp.value), interestList);
        });
    }
    init();
})();
