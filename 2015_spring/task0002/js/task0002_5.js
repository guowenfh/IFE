window.onload = winLoad();

function winLoad() {
    var dragBlock = $(".drag-block"); //最外层容器
    var leftUl = $(".left-ul"); //左边ul
    var rightUl = $(".right-ul"); //右边ul
    var aLi = dragBlock.getElementsByTagName("li");

    changeColor(dragBlock);
    /*改变颜色*/
    function changeColor(element) {
        var oLi = element.getElementsByTagName("li");
        for (var i = 0, len = oLi.length; i < len; i++) {
            oLi[i].style.backgroundColor = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
        }
    }
    var zInd = 2;

    toPosition(dragBlock, "li");
    //    toPosition(leftUl, "li");
    //    toPosition(rightUl, "li");
    /**
     * 布局转换函数
     * @param {HTMLElment} element  HTML对象
     * @param {string}     childEle 其内需要转换的标签名
     */
    function toPosition(element, childEle) {
        var eleArr = element.getElementsByTagName(childEle);
        var aPos = [];
        //
        for (var i = 0, len = eleArr.length; i < len; i++) {
            aPos[i] = {
                left: eleArr[i].offsetLeft,
                top: eleArr[i].offsetTop
            };
        }
        for (i = 0, len = eleArr.length; i < len; i++) {
            eleArr[i].style.left = aPos[i].left + "px";
            eleArr[i].style.top = aPos[i].top + "px";
            eleArr[i].style.position = "absolute";
            eleArr[i].style.margin = "0";
            eleArr[i].index = i;
        }
    }


    //事件代理
    delegateEvent(dragBlock, "li", "mousedown", function(ev) {
        var oEvent = ev || event;
        var disX = oEvent.clientX - this.offsetLeft; //鼠标在容器中的位置
        var disY = oEvent.clientY - this.offsetTop;

        zInd++;
        this.style.zIndex = zInd; //修改层级
        var that = this; //缓存this
        //添加鼠标移动及跳出事件
        addEvent(document, "mousemove", onmousemove);
        addEvent(document, "mouseup", onmouseup);

        //在点击拖拽时，在原位置创建一个li
        var createActive = document.createElement("li");
        createActive.style.left = that.offsetLeft + "px";
        createActive.style.top = that.offsetTop + "px";
        createActive.className = "create-active";
        createActive.style.position = "absolute";
        that.parentNode.appendChild(createActive);

        //保存创建li的位置
        var originalLeft = parseInt(createActive.style.left);
        var originalTop = parseInt(createActive.style.top);

        var createActivePar = createActive.parentNode;
        //拖拽时透明度改变
        that.style.opacity = "0.5";
        /**
         * 鼠标移动
         */
        function onmousemove(ev) {
            var oEvent = ev || event;
            var dragL = oEvent.clientX - disX;
            var dragT = oEvent.clientY - disY;

            //边界限制
            var winWidth = document.body.clientWidth || document.documentElement.clientWidth;
            var winHeight = document.body.clientHeight || document.documentElement.clientHeight;
            // console.log(winWidth + "," + winHeight)
            if (dragL < -40) {
                dragL = -40;
            } else if (dragL >= (winWidth - that.offsetWidth)) {
                dragL = winWidth - that.offsetWidth - that.offsetWidth / 2;
            }
            if (dragT < -40) {
                dragT = -40;
            } else if (dragT >= (winHeight - that.offsetHeight)) {
                dragT = winHeight - that.offsetHeight;
            }


            that.style.left = dragL + "px";
            that.style.top = dragT + "px";



            for (var i = 0, len = aLi.length; i < len; i++) {
                removeClass(aLi[i], "active");
            }

            var oNear = findNearest(that);
            //移动时碰撞上的情况
            if (oNear) {
                addClass(oNear, "active");
            }
        }
        /**
         * 鼠标抬起删除事件
         */
        function onmouseup() {
            removeEvent(document, "mousemove", onmousemove);
            removeEvent(document, "mouseup", onmouseup);
            var oNear = findNearest(that);

            //鼠标抬起，碰撞到的情况
            if (oNear) {
                //如果碰撞不发生在同一父级中
                if (that.parentNode !== oNear.parentNode) {
                    oNear.parentNode.insertBefore(that, oNear);
                    that.style.left = oNear.style.left;
                    that.style.top = oNear.style.top;
                    var oNearLi = oNear.parentNode.getElementsByTagName("li");
                    var thatLi = createActivePar.getElementsByTagName("li");

                    //添加过去后处理位置
                    for (var i = getIndex(that) + 1, len = oNearLi.length; i < len; i++) {
                        oNearLi[i].style.left = that.style.left;
                        oNearLi[i].style.top = that.offsetHeight + oNearLi[i].offsetTop + "px";
                    }

                    //处理原位置。
                    for (var j = 0, thatLen = thatLi.length; j < thatLen; j++) {
                        if (j === 0) {
                            thatLi[0].style.left = createActivePar.offsetLeft + 1 + "px";
                            thatLi[0].style.top = createActivePar.offsetTop + 1 + "px";
                        } else {
                            thatLi[j].style.left = thatLi[j - 1].style.left;
                            thatLi[j].style.top = that.offsetHeight + thatLi[j - 1].offsetTop + "px";
                        }

                    }

                } else {
                    //碰撞发生在同一父级的情况
                    //交换位置
                    that.style.left = oNear.style.left;
                    that.style.top = oNear.style.top;
                    oNear.style.left = originalLeft + "px";
                    oNear.style.top = originalTop + "px";

                }

            } else {
                //未碰撞到的情况
                //再来判断是不是与对面的父容器碰撞到了，调用函数
                if (that.parentNode === leftUl) {
                    appChild(that, rightUl);

                } else {
                    appChild(that, leftUl);

                }

            }
            createActive.parentNode.removeChild(createActive);
            that.style.opacity = "1";
        }
        /**
         * 插入对方父容器函数
         * @param {object} obj    待插入节点
         * @param {object} parent 对方父节点
         */
        function appChild(obj, parent) {
            //碰撞对面父级元素的情况
            if (hitDetection(obj, parent)) {
                var oLi = parent.getElementsByTagName("li");
                var len = oLi.length;
                parent.appendChild(obj);
                //新父元素内没有li的情况
                if (len) {
                    obj.style.left = oLi[0].style.left;
                    obj.style.top = oLi[len - 1].offsetTop + oLi[0].offsetHeight + "px";
                } else {
                    obj.style.left = parent.offsetLeft + 1 + "px";
                    obj.style.top = parent.offsetTop + 1 + "px";
                }

                //处理原位置。
                var thatLi = createActivePar.getElementsByTagName("li");
                for (var j = 0, thatLen = thatLi.length; j < thatLen; j++) {
                    if (j === 0) {
                        thatLi[0].style.left = createActivePar.offsetLeft + 1 + "px";
                        thatLi[0].style.top = createActivePar.offsetTop + 1 + "px";
                    } else {
                        thatLi[j].style.left = thatLi[j - 1].style.left;
                        thatLi[j].style.top = that.offsetHeight + thatLi[j - 1].offsetTop + "px";
                    }

                }
            } else {
                //未碰撞到时返回原位置
                startMove(obj, { left: originalLeft, top: originalTop }, function() {
                    obj.style.left = originalLeft + "px";
                    obj.style.top = originalTop + "px";
                });
            }
        }
        clearInterval(that.timer); //处理在未碰撞到时，回到原位置途中再次拖拽的问题。不然会闪屏

    });

    /**
     * 碰撞检测函数
     * @param   {object}  obj1 对象1
     * @param   {object}  obj2 对象2
     * @returns {boolean} 碰撞时返回true，否则反正false
     */
    function hitDetection(obj1, obj2) {
        //对象1的相关值
        var l1 = obj1.offsetLeft;
        var r1 = obj1.offsetLeft + obj1.offsetWidth;
        var t1 = obj1.offsetTop;
        var b1 = obj1.offsetTop + obj1.offsetHeight;
        //对象2的相关值
        var l2 = obj2.offsetLeft;
        var r2 = obj2.offsetLeft + obj2.offsetWidth;
        var t2 = obj2.offsetTop;
        var b2 = obj2.offsetTop + obj2.offsetHeight;

        if (l1 > r2 || r1 < l2 || b1 < t2 || t1 > b2) {
            return false;
        } else {
            return true;
        }
    }
    //获取两点直线的距离
    function getDis(obj1, obj2) {
        var a = obj1.offsetLeft - obj2.offsetLeft;
        var b = obj1.offsetTop - obj2.offsetTop;
        return Math.sqrt(a * a + b * b);
    }
    //获取距离最近的元素
    function findNearest(obj) {
        var iMin = 99999999;
        var iMinIndex = -1;
        for (var i = 0, len = aLi.length; i < len; i++) {
            if (obj == aLi[i]) {
                continue;
            }

            if (hitDetection(obj, aLi[i])) {
                var dis = getDis(obj, aLi[i]);

                if (iMin > dis) {
                    iMin = dis;
                    iMinIndex = i;
                }
                if (iMinIndex == -1) {
                    return null;
                } else {
                    return aLi[iMinIndex];
                }
            }

        }
    }
}
