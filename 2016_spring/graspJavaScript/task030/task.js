/*global gg */
(function(window, document) {
    'use static';

    /**
     * 表单验证函数
     * @param  {String} text 待验证的输入
     * @return {String}      错误码
     */
    function inputCheck (text) {
        text = trim(text);
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
     * @param {String} info className
     */
    function changeClass (eleArr, info) {
        if (info && info === '名称格式正确') {
            eleArr.forEach(function(item) {
                item.className = 'success';
            });
        } else {
            eleArr.forEach(function(item) {
                item.className = 'error';
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
        inputArr.forEach(function(item, index){
            console.info(index,item)
            gg.addEvent(item, 'focus', function(event){
                console.info(event)
                this.parentNode.innerHTML = this.outerHTML+'<div>asdsad</div>';
                console.info(foucInfoArr[index]);
            });
            gg.addEvent(item, 'blur', function(event){
                console.info(event)
                this.parentNode.innerHTML = this.outerHTML+'<div>asdsad</div>';
                console.info(foucInfoArr[index]);
            });
        });
        // 获取标签
    }
    init();
})(window, document);
