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
    function CreateForm(config) {
        this.label = config.label || '名称';
        this.type = config.type || 'text';
        this.rules = config.rules || '必填';
        this.label = config.label || '名称';
        this.success = config.success || '可用';
        this.fail = config.fail || '验证不通过请重新填写！';
        this.validator = config.validator;
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