/*global gg */
(function(window, document) {

    /**
     * 创建表单
     */
    function createForm() {
        var obj = {

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
            var lengthGroup = document.querySelector('.length-group');
            var textareaGroup = document.querySelector('.textarea-group');
            gg.delegate(tagGroup, 'input', 'click', function(ev) {
                if (this.value === '1') {
                    inptypeGroup.style.display = 'block';
                    lengthGroup.style.display = 'block';
                    textareaGroup.style.display = 'none';
                } else {
                    inptypeGroup.style.display = 'none';
                    lengthGroup.style.display = 'none';
                    if (this.value === '2') {
                        textareaGroup.style.display = 'none';
                    } else {
                        textareaGroup.style.display = 'block';

                    }
                }
                obj.tagName = tagMap[this.value];
            });

        };

        /**
         * 文本输入框的类型
         */
        this.regGroup = function() {
            var regMap = {
                '1': {
                    name: '名称',
                    type: 'text',
                    reg: /^\d+$/,
                },
                '2': {
                    name: '数字',
                    type: 'number',
                    reg: /^\d+$/,
                },
                '3': {
                    name: '密码',
                    type: 'password',
                    reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
                },
                '4': {
                    name: '电话',
                    type: 'tel',
                    reg: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                },
                '5': {
                    name: '邮箱',
                    type: 'email',
                    reg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
                },
            };
            var inptypeGroup = document.querySelector('.inptype-group');
            var labelText = document.getElementById('label-text');
            gg.delegate(inptypeGroup, 'input', 'click', function() {
                obj.reg = regMap[this.value].reg;
                obj.type = regMap[this.value].type;
                labelText.value = regMap[this.value].name;
            });
        };

        /**
         * 点击创建按钮
         */
        this.create = function() {
            var createBtn = document.getElementById('create-btn');
            // 表单生成容器
            var formContent = document.getElementById('form-content');
            gg.addEvent(createBtn, 'click', function(ev) {
                // var oDiv = document.createElement('div');
                var label = document.createElement('label');
                label.innerText = '213123';
                var inp = document.createElement('input');
                var tip = document.createElement('div');
                label.appendChild(inp);
                label.appendChild(tip);
                formContent.appendChild(label);
            });

        };

        /**
         * 初始化各种方法
         */
        this.init = function() {
            this.tagName();
            this.regGroup();
            this.create();
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