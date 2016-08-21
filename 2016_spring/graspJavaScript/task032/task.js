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

        this.createInput = function() {

        };

        /**
         * 创建多选框，单选框，下拉框
         */
        this.createMultiple = function(tagName, labelValue) {

            /**
             * 得到文本域的值，分割成单选框或复选框的值
             * @param  {String} value 文本域的值
             * @return {Array}  用于生成列表项的数字
             */
            var interestInpFun = function(value) {
                // 将输入分割成数组，并且进行去重操作
                value = gg.trim(value);
                if (value.length < 1) {
                    alert('请输入内容');
                    return;
                }
                return gg.uniqArray(value.split(/[\n|\s+|\,|\，|\、|\;|\；\。\.]+/));
            };

            var interestInp = document.getElementById('interest-inp'); // 用于生成多选框的z
            labelValue = labelValue || '名称';
            var valueArr = interestInpFun(interestInp.value);
            console.info(valueArr);

            /**
             * 用于生成多选框html片段
             */
            var html =
                '<div class="row">' +
                '    <div class="col-20 inp-label">' + labelValue +
                '    </div>' +
                '    <div class="col-80 input-type">';
            if (tagName === 'select') {
                html += '<select>';
                for (var i = 0; i < valueArr.length; i++) {
                    html += '<option value="' + valueArr[i] + '">' + valueArr[i] + '</option>';
                }
                html += '<select>';

            } else {
                for (var j = 0; j < valueArr.length; j++) {
                    html +=
                        '   <label>' +
                        '       <input value="' + valueArr[j] + '" name="' + labelValue + '" type="' + tagName + '">' + valueArr[j] +
                        '   </label>';
                }
            }
            html +=
                '    </div>' +
                '</div>';
            return html;

        };


        /**
         * 点击创建按钮
         */
        this.create = function() {
            var createBtn = document.getElementById('create-btn');
            var that = this;
            // 表单生成容器

            gg.addEvent(createBtn, 'click', function(ev) {

                var tagName = tagGroup.querySelector('input:checked').value; // 标签名字
                // var inputType = inptypeGroup.querySelector('input:checked').value; // input类型
                var labelValue = document.getElementById('label-text').value;
                var html;
                if (tagName === 'radio' || tagName === 'checkbox' || tagName === 'select') {
                    html = that.createMultiple(tagName, labelValue);
                } else {
                    that.createInput();
                }
                console.info(tagName);
                var oDiv = document.createElement('div');
                oDiv.innerHTML = html;
                formContent.appendChild(oDiv);
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
