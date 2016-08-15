/*global gg */
(function(window, document) {
    'use static';


    // {
    //     label: '名称',                    // 表单标签
    //     type: 'input',                   // 表单类型
    //     validator: function () {...},    // 表单验证规
    //     rules: '必填，长度为4-16个字符',    // 填写规则提示
    //     success: '格式正确',              // 验证通过提示
    //     fail: '名称不能为空'               // 验证失败提示
    // }

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
     * 创建表单
     */
    function CreateForm(){
        // 创建。。
    }

    /**
     *  函数初始化
     */
    function init() {
        // init
    }
    init();
})(window, document);
