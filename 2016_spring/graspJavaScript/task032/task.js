/*global gg checkArr*/
(function(window, document) {

    /**
     * 表单验证函数
     * @param  {String} text 待验证的输入
     * @param  {data} data 对象
     * @return {String}      错误码
     */
    function inputCheck(text, data) {
        text = gg.trim(text);
        if (data.min && text.length < data.min || data.max && text.length > data.max) {
            data.isPassed = false;
            return (data.min ? '最少需要' + data.min + '个字符 ' : '') + (data.max ? ' 最多不能超过' + data.max + '个字符' : '');
        }
        if (!data.reg || data.reg.test(text)) {
            data.isPassed = true;
            return data.success;
        } else {
            data.isPassed = false;
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
                // item.className += ' success';
                gg.addClass(item, 'success');
            });
        } else {
            eleArr.forEach(function(item) {
                // item.className += ' error';
                gg.addClass(item, 'error');

            });
        }
    }

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


        this.createInput = function(tagName, inputType, labelValue) {

            var label = document.createElement('label');
            label.innerHTML = '<div class="col-20 inp-label">' + labelValue + '</div>';
            var inputWrap = document.createElement('div');
            inputWrap.className = 'col-80';
            var input;
            if (tagName === 'textarea') {
                input = document.createElement('textarea');
                inputWrap.appendChild(input);
                label.appendChild(inputWrap);
                return label;
            } else {
                input = document.createElement('input');
                input.type = inputType;
            }
            // 验证规则
            var regMap = checkArr['input'][inputType];

            var len = lengthGroup.querySelectorAll('input');
            if (len[0].value && len[0].value) {
                if (len[0].value < len[1].value) {
                    regMap.min = len[0].value;
                    regMap.max = len[1].value;
                } else {
                    regMap.min = len[0].value;
                    regMap.max = len[1].value;
                }
            }

            gg.addClass(input, 'input');
            var tip = document.createElement('p');
            tip.innerHTML = regMap.rules;
            var tipClassName = 'tip ' + document.querySelector('.class-select').value;
            tip.className = tipClassName;

            gg.addEvent(input, 'focus', function() {
                input.className = 'input';
                tip.className = tipClassName;
            });
            gg.addEvent(input, 'blur', function() {
                tip.innerHTML = inputCheck(this.value, regMap);
                changeClass([input, tip], regMap.isPassed);
            });

            inputWrap.appendChild(input);
            inputWrap.appendChild(tip);
            label.appendChild(inputWrap);
            return label;
        };

        /**
         * 创建多选框，单选框，下拉框
         * @param  {String} tagName    多选类型
         * @param  {String} labelValue 描述类型
         * @return {String}            html片段字符串
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

            /**
             * 用于生成多选框html片段
             */
            var html =
                '<div class="col-20 inp-label">' + labelValue +
                '</div>' +
                '<div class="col-80 input-type">';
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
                var inputType = inptypeGroup.querySelector('input:checked').value; // input类型
                var labelValue = document.getElementById('label-text').value;
                var oDiv = document.createElement('div');
                gg.addClass(oDiv, 'row');
                if (tagName === 'radio' || tagName === 'checkbox' || tagName === 'select') {
                    oDiv.innerHTML = that.createMultiple(tagName, labelValue);
                } else {
                    oDiv.appendChild(that.createInput(tagName, inputType, labelValue));
                }
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
