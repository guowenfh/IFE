/*global gg */
(function(window, document) {
    'use static';

    /**
     * 表单验证函数
     * @param  {String} text 待验证的输入
     * @return {String}      错误码
     */
    function inputCheck(text) {
        text = gg.trim(text);
        var result = '';
        var cont = 0;
        if (text === '') {
            result = '名字不能为空！';
        } else {
            text.split('').forEach(function(item) {
                if (/[^\x00-\xff]/.test(item)) {
                    cont += 2;
                } else {
                    cont += 1;
                }
            });
            if (cont > 4 && cont <= 16) {
                result = '名称格式正确';
            } else {
                result = '长度为4～16个字符';
            }
        }
        return result;
    }

    /**
     * 更改提示样式
     * @param {Array} eleArr 需要更改样式的元素的数组
     * @param {String} isSsucce 是否成功
     */
    function changeClass(eleArr, isSsucce) {
        if (isSsucce) {
            eleArr.forEach(function(item) {
                item.className += ' success';
            });
        } else {
            eleArr.forEach(function(item) {
                item.className += ' error';
            });
        }
    }

    /**
     *  函数初始化
     */
    function init() {
        var form = document.getElementById('form');
        var foucInfoArr = [
            '必填，长度为4-16个字符',
            '密码应该大于6位且由字母和数字混合组成',
            '两次输入相同的密码',
            '邮箱应该以类似@gmail.com的格式编写',
            '请正确填写11位手机号码',
        ];
        var inputArr = form.querySelectorAll('input');
        inputArr.forEach(function(item, index) {
            gg.addEvent(item, 'focus', function(event) {
                var tipInfo = this.parentNode.getElementsByClassName('tip');
                if (tipInfo.length === 0) {
                    tipInfo = document.createElement('div');
                    tipInfo.className = 'tip';
                    tipInfo.innerHTML = foucInfoArr[index];
                    this.parentNode.appendChild(tipInfo);
                } else {
                    tipInfo[0].className = 'tip';
                    tipInfo[0].innerHTML = foucInfoArr[index];
                }
            });
            gg.addEvent(item, 'blur', function(event) {
                var tipInfo = this.parentNode.getElementsByClassName('tip');
                console.info(this.value);
                var tipText = inputCheck(this.value);
                tipInfo[0].innerHTML = tipText;
                changeClass([this, tipInfo[0]], false);
            });
        });
        // 获取标签
    }
    init();
})(window, document);
