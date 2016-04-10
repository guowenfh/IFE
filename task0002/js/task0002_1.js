(function handle_1() {
    var inp = $("#user_input");
    var out = $("#user_output");
    $.click("#btn", function () {
        var value = inp.value.split(/\n|\s+|\,|\，|\、|\;|\；/); //分割成数组。
        var unValue = uniqArray(value); //数组去重
        var i = 0,
            len = unValue.length;
        if (len > 10 || unValue == "") {
            $("p").style.display = "block";
        } else {
            $("p").style.display = "none";
            out.innerHTML = "";
            for (; i < len; i++) {
                var trimValue = trim(unValue[i]); //对每一项进行去除首尾空格操作
                console.log(trimValue);
                if (trimValue !== "") { //只有在去除首尾空格后不为空的数组才输出。
                    out.innerHTML += "<label>" + "<input type='checkbox'>" + trimValue + "</label>";
                }
            }
        }
    });
})();
