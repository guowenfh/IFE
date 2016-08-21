/*global gg checkArr*/
(function(window, document) {

    /**
     * 创建表单
     */
    function createForm() {
        var tagGroup = document.querySelector('.tag-group'); // 标签类型
        var inptypeGroup = document.querySelector('.inptype-group'); // input框的类型
        var lengthGroup = document.querySelector('.length-group'); // input的长度限制
        var textareaGroup = document.querySelector('.textarea-group'); // 文本域
        var labelText = document.getElementById('label-text'); // 标签描述
        var formContent = document.getElementById('form-content'); // 表单生成容器

        /**
         * 获得选中的tagName
         */
        this.tagName = function() {
            gg.delegate(tagGroup, 'input', 'click', function(ev) {
                if (this.value === 'input') {
                    inptypeGroup.style.display = 'block';
                    lengthGroup.style.display = 'block';
                    textareaGroup.style.display = 'none';
                } else {
                    inptypeGroup.style.display = 'none';
                    lengthGroup.style.display = 'none';
                    if (this.value === 'textarea') {
                        textareaGroup.style.display = 'none';
                    } else {
                        textareaGroup.style.display = 'block';
                    }
                    labelText.value = checkArr[this.value].name;
                }
            });
        };

        /**
         * 文本输入框的类型
         */
        this.regGroup = function() {
            var regMap = checkArr.input;
            gg.delegate(inptypeGroup, 'input', 'click', function() {
                labelText.value = regMap[this.value].name;
            });
        };

        /**
         * 点击创建按钮
         */
        this.create = function() {
            var createBtn = document.getElementById('create-btn');
            // 表单生成容器
            gg.addEvent(createBtn, 'click', function(ev) {

                var tagName = tagGroup.querySelector('input:checked').value; // 标签名字
                var inp = document.createElement(tagName); // 创建form标签

                if (tagName === 'input') {
                    var inputType = inptypeGroup.querySelector('input:checked').value; // input类型
                    inp.type = inputType;
                }
                console.info(inputType);
                console.info(tagName);
                var labelValue = document.getElementById('label-text').value;
                var label = document.createElement('label');
                label.innerText = labelValue;

                // var tip = document.createElement('div');
                // label.appendChild(inp);
                // label.appendChild(tip);
                formContent.appendChild(label);
            });

        };
        this.createInput = function() {

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