window.onload = function () {
    function start() {
        var show = $("div"); //显示剩余时间的div

        function clickStart() {
            var time = $("input").value.match(/(^\d{4})-(\d{2})-(\d{2}$)/); //获取年月日的正则方法
            if (time !== null) {
                var setTime = new Date(time[1], time[2] - 1, time[3]); //设置目标时间
                var thisTime = new Date(); //获取到当前的时间。
                var date = setTime.getTime() - thisTime.getTime(); //得出相差的时间为毫秒数
                var lefttime = parseInt((setTime.getTime() - thisTime.getTime()) / 1000); //得到相差秒数
                var d = parseInt(lefttime / (60 * 60 * 24)); //天
                var h = parseInt(lefttime / (60 * 60) % 24); //秒
                var m = parseInt(lefttime / 60 % 60); //分
                var s = parseInt(lefttime % 60); //秒
                show.innerHTML = "距离" + setTime.getFullYear() + "年" + (setTime.getMonth() + 1) + "月" + setTime.getDate() + "日，还有" + d + "天" + h + "小时" + m + "分" + s + "秒";
                setTimeout(clickStart, 1000); //使用回调函数的方式，进行定时执行。
                if (date <= 0) { //到达目标
                    clearTimeout(clickStart);
                    show.innerHTML = "时间已经到了，你完成了目标吗？"
                }
            } else {
                show.innerHTML = "输入有误,请按指定格式输入";
            }
        }
        $.click("button", function () {
            clickStart();
        }); //点击执行
    }
    start();
};