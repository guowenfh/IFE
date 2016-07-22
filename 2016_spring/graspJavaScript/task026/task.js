(function(window, document) {
    /**
     * 表单验证函数
     * @param  {String} text 待验证的输入
     * @return {String}      错误码
     */
    function inputCheck(text) {
        var text = trim(text);
        var result = "";
        var cont = 0;
        if (text === "") {
            result = "名字不能为空！";
        } else {
            text.split("").forEach(function(item) {
                if (/[^\x00-\xff]/.test(item)) {
                    cont += 2;
                } else {
                    cont += 1;
                }
            });
            if (cont > 4 && cont <= 16) {
                result = "名称格式正确";
            } else {
                result = "长度为4～16个字符";
            }
        }
        return result;
    }

    function changeClass(eleArr, info) {
        if (info && info === "名称格式正确") {
            eleArr.forEach(function(item) {
                item.className = "success";
            });
        } else {
            eleArr.forEach(function(item) {
                item.className = "error";
            });
        }

    }

    function init() {
        var input = document.querySelector('#inp');
        var button = document.querySelector('#button');
        var tipInfo = document.querySelector("#name-tips");
        addEvent(button, "click", function() {
            var result = inputCheck(input.value);
            tipInfo.innerHTML = result;
            changeClass([tipInfo, input], result);
        });
    }
    init();
})(window, document);
