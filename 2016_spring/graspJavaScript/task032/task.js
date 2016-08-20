/*global gg */
(function(window, document) {
    /**
     * 创建表单
     */
    function createForm() {
        var obj = {};
        this.init = function() {
            var tagName = this.tagName();

        };

        /**
         * 获得选中的tagName
         */
        this.tagName = function() {
            var tagMap = {
                '1': 'input',
                '2': 'textarea',
                '3': 'raido',
                '4': 'check',
                '5': 'select',
            };
            var tagGroup = document.querySelector('.tag-group');
            var inptypeGroup = document.querySelector('.inptype-group');
            gg.delegate(tagGroup, 'input', 'click', function() {
                if (this.value === '1') {
                    gg.removeClass(inptypeGroup, 'hide')
                    gg.addClass(inptypeGroup, 'show');
                } else {
                    gg.removeClass(inptypeGroup, 'show')
                    gg.addClass(inptypeGroup, 'hide');

                }
                obj.tagName = tagMap[this.value];
            });

        };
        this.init();
    }
    createForm();
})(window, document);


// (function(window, document) {
//     'use static';


//     // {
//     //     label: '名称',                    // 表单标签
//     //     type: 'input',                   // 表单类型
//     //     validator: function () {...},    // 表单验证规
//     //     rules: '必填，长度为4-16个字符',    // 填写规则提示
//     //     success: '格式正确',              // 验证通过提示
//     //     fail: '名称不能为空'               // 验证失败提示
//     // }

//     /**
//      * 更改提示样式
//      * @param {Array} eleArr 需要更改样式的元素的数组
//      * @param {String} isSsucce 是否成功
//      */
//     function changeClass(eleArr, isSsucce) {
//         if (isSsucce) {
//             eleArr.forEach(function(item) {
//                 item.className += ' success';
//             });
//         } else {
//             eleArr.forEach(function(item) {
//                 item.className += ' error';
//             });
//         }
//     }


//     /**
//      *  函数初始化
//      */
//     function init() {
//         var formContent = document.getElementById('form-content');
//         var label = document.createElement('label');
//         var inp = document.createElement('input');
//         var tip = document.createElement('div');
//         label.appendChild(inp);
//         label.appendChild(tip);
//         formContent.appendChild(label);
//     }
//     init();
// })(window, document);