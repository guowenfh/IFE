/*global gg */
(function(window, document) {
    'use static';

    /**
     * 表单验证函数
     * @param  {String} text 待验证的输入
     * @param  {data} data 对象
     * @return {String}      错误码
     */
    function inputCheck(text, data) {
        text = gg.trim(text);
        var map = {
            name: '名称',
            password: '密码',
            password2: '再次输入密码',
            email: '邮箱',
            phone: '手机号码',
        };
        if (text === '') {
            return map[data.id] + '不能为空！';
        }
        if (data.min && text.length < data.min || data.max && text.length > data.max) {
            return (data.min ? '最少需要' + data.min + '个字符 ' : '') + (data.max ? ' 最多不能超过' + data.max + '个字符' : '');
        }
        if (!data.reg || data.reg.test(text)) {
            data.isPassed = true;
            return data.success;
        } else {
            return data.error;
        }
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
        var checkArr = [{
            min: 4,
            max: 16,
            isPassed: false,
            success: '名称可用',
            error: '长度为4-16个字符',
        }, {
            reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
            min: 6,
            isPassed: false,
            success: '密码可用',
            error: '密码应该大于6位且由字母和数字混合组成',
        }, {
            reg: /^\w+$/,
            min: 6,
            isPassed: false,
            success: '密码输入一致',
            error: '两次输入的密码应该一致',
        }, {
            reg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            isPassed: false,
            success: '邮箱可用',
            error: '邮箱格式错误',
        }, {
            reg: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            isPassed: false,
            success: '手机格式正确',
            min: 11,
            error: '手机格式错误',
        }];

        var inputArr = form.querySelectorAll('input');
        inputArr.forEach(function(item, index) {
            gg.addEvent(item, 'focus', function(event) {
                var tipInfo = this.parentNode.getElementsByClassName('tip');
                this.className = 'input';
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
                var checkIndex = checkArr[index];
                checkIndex.id = this.id;
                if (this.id === 'password2') {
                    checkIndex.reg = new RegExp((document.getElementById('password')).value);
                }
                checkIndex.text = foucInfoArr[index];
                var tipText = inputCheck(this.value, checkIndex);
                tipInfo[0].innerHTML = tipText;
                changeClass([this, tipInfo[0]], checkArr[index].isPassed);
            });
        });
        // 获取标签
    }
    init();
})(window, document);
