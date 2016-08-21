/*global gg checkArr*/
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
            var tagGroup = document.querySelector('.tag-group');
            var inptypeGroup = document.querySelector('.inptype-group');
            var lengthGroup = document.querySelector('.length-group');
            var textareaGroup = document.querySelector('.textarea-group');
            var labelText = document.getElementById('label-text');
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
            var inptypeGroup = document.querySelector('.inptype-group');
            var labelText = document.getElementById('label-text');
            gg.delegate(inptypeGroup, 'input', 'click', function() {
                labelText.value = regMap[this.value].name;
            });
        };

        /**
         * 点击创建按钮
         * @param {Object} obj 表单生成项
         */
        this.create = function(obj) {
            var createBtn = document.getElementById('create-btn');
            // 表单生成容器
            var formContent = document.getElementById('form-content');
            gg.addEvent(createBtn, 'click', function(ev) {
                // console.info(obj);
                // var oDiv = document.createElement('div');
                // var label = document.createElement('label');
                // label.innerText = '213123';
                // var inp = document.createElement(obj.name);
                // var tip = document.createElement('div');
                // label.appendChild(inp);
                // label.appendChild(tip);
                // formContent.appendChild(label);
            });

        };

        /**
         * 初始化各种方法
         */
        this.init = function() {
            this.tagName();
            this.regGroup();
            this.create(obj);
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