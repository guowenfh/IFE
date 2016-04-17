window.onload = winLoad();


function winLoad() {

    Slideshow($(".imgContainer"), {
        // reverse: "1"
    });

    /**
     * 轮播图组件
     * @param {HTMLELement} element HTML节点图片容器
     * @param {JSON}                     option  配置项
     *   @config   {String}                 noLoop         不循环？，默认为循环，只要存在则不循环
     *   @config   {String}                  reverse        是否反向，只有“noLoop”不存在时，也就是只有循环时，才执行。
     *   @config   {Number}             intervalTime   轮播间隔时间（单位为毫秒），默认为4000，
     */
    function Slideshow(element, option) {
        //1. 实现点击切换
        var timer = null; //自动播放定时器
        var imgArr = element.getElementsByTagName("img"); //获取图片数量
        var imgArrLen = imgArr.length; //缓存图片数量
        var createUl = document.createElement("ul"); //创建小点的ul
        var iCurrent = parseInt(getStyle(imgArr[0], "width")); //获取一张图片的宽度
        element.style.width = iCurrent * imgArrLen + "px"; //设置图片容器的宽度。
        var iSpeed;
        //创建li
        for (var i = 0, len = imgArrLen; i < len; i++) {
            createUl.innerHTML += "<li></li>";
        }
        element.parentNode.appendChild(createUl); //插入导航
        addClass(createUl, "Slideshow-nav"); //添加导航样式
        addClass(createUl.getElementsByTagName("li")[0], "active"); //默认设置第一个为第当前活动的li

        //创建左右导航
        var createSpan = document.createElement("div");
        addClass(createSpan, "left-right");
        createSpan.innerHTML = "<span class='nav-left'>&lt;</span><span class='nav-right'>&gt;</span>";
        element.parentNode.appendChild(createSpan);

        //图片自动播放间隔时间。//默认3000毫秒
        if (option.intervalTime) {
            iSpeed = option.intervalTime;
        } else {
            iSpeed = 3000;
        }
        //2.实现自动播放
        timer = setInterval(autoPlay, iSpeed);

        clickLi(); //执行点击函数
        hoverElement();
        /*
         * 移入图片容器暂停，移出继续播放。
         * 因为该函数，避免了很多复杂的东西以及bug
         */
        function hoverElement() {
            addEvent(element.parentNode, "mouseover", function () {
                clearInterval(timer);
            });
            addEvent(element.parentNode, "mouseout", function () {
                timer = setInterval(autoPlay, iSpeed);
            });
        }
        /**
         * 点击Li
         */
        function clickLi() {
            delegateEvent(createUl, "li", "click", function () {
                var iTaget = -iCurrent * getIndex(this);
                removeLiClass();
                addClass(this, "active"); //移出

                startMove(element, {
                    "left": iTaget
                });
                clearInterval(timer);
                // element.style.left=iTaget+"px";
            });
        }
        // 4. 左右箭头
        clickSpan();
        /**
         * 点击左右箭头
         */
        function clickSpan() {
            delegateEvent(createSpan, "span", "click", function () {
                clearInterval(timer);
                var heightLi = $(".Slideshow-nav .active"); //高亮的待选li
                var leftIndex = !getIndex(this); //点击左时为true，点击右为false
                //移动的目标值，默认正向
                play(leftIndex);
            });
        }
        /**
         * 自动播放调用函数
         */
        function autoPlay() {
            var heightLi = $(".Slideshow-nav .active"); //高亮的待选li
            var iTaget;
            //移动的目标值，默认正向
            if (heightLi) {
                // 3.1添加配置项
                if (option.noLoop) {
                    iTaget = (getIndex(heightLi) + 1) === imgArrLen ? 0 : (-iCurrent * (getIndex(heightLi) + 1));

                    if (getIndex(heightLi) + 1 === imgArrLen - 1) {
                        clearInterval(timer);
                    }
                    var nextLi = heightLi.nextElementSibling;
                    if (nextLi) {
                        removeLiClass();
                        addClass(nextLi, "active");
                    }
                    startMove(element, {
                        "left": iTaget
                    });
                } else {
                    if (option) {
                        play(option.reverse);
                    } else {
                        play("");
                    }
                }
            }
        }
        /*
         *  循环轮播，点击左右箭头及循环时触发（正向与反向循环）
         */
        function play(reverse) {
            var heightLi = $(".Slideshow-nav .active"); //高亮的待选li
            var iTaget;
            // 3.2添加配置项
            if (reverse) {
                //当配置项为反向时，且循环时，更改目标值
                iTaget = getIndex(heightLi) === 0 ? -iCurrent * (imgArrLen - 1) : -iCurrent * (getIndex(heightLi) - 1); //反向循环
                var previousLi = heightLi.previousElementSibling;
                if (previousLi) {
                    removeLiClass();
                    addClass(previousLi, "active"); //移出
                } else {
                    removeLiClass();
                    addClass(createUl.getElementsByTagName("li")[imgArrLen - 1], "active");
                }
            } else {
                iTaget = (getIndex(heightLi) + 1) === imgArrLen ? 0 : (-iCurrent * (getIndex(heightLi) + 1));
                var nextLi = heightLi.nextElementSibling;
                if (nextLi) {
                    removeLiClass();
                    addClass(nextLi, "active");

                } else {
                    removeLiClass();
                    addClass($(".Slideshow-nav li"), "active");
                }
            }
            startMove(element, {
                "left": iTaget
            });
        }

        /**
         * 用于移除所有的Li的选中状态：active
         */
        function removeLiClass() {
            var oLi = createUl.getElementsByTagName("li");
            for (var i = 0, len = oLi.length; i < len; i++) {
                removeClass(oLi[i], "active");
            }
        }
    }
}
