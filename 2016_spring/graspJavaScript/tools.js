(function(window, document) {

    /**
     * 事件添加函数,惰性载入
     * @param { HTMLElement  } ele     触发事件的Dom对象
     * @param { String   } event   触发的事件类型
     * @param { Fucntion } func    事件触发执行的函数
     */
    var addEvent = (function() {
        if (document.addEventListener) {
            return function(ele, event, func) {
                ele.addEventListener(event, func, false);
            };
        } else if (document.attachEvent) {
            return function(ele, event, func) {
                ele.attachEvent('on' + event, func);
            };
        } else {
            return function(ele, event, func) {
                ele['on' + event] = func;
            };
        }
    })();

    /**
     * 事件删除函数,利用闭包特性，惰性载入（只需要加载一次）
     * @param { Element  } ele     需要删除事件的Dom对象
     * @param { String   } event   删除的事件类型
     * @param { Fucntion } func    事件触发执行的函数
     */
    var removeEvent = (function() {
        if (document.removeEventListener) {
            return function(ele, type, func) {
                ele.removeEventListener(type, func, false);
            };
        } else if (document.detachEvent) {
            return function(ele, type, func) {
                ele.detachEvent('on' + type, func);
            };
        } else {
            return function(ele, type) {
                ele['on' + type] = null;
            };
        }
    })();

    /**
     * 字符串去首尾空格
     * @param  {String} str     待处理字符串
     * @return {String}         处理后的字符串
     */
    function trim(str) {
        var result = '';
        result = str.replace(/^\s+|\s+$/g, ''); // 使用正则进行字符串替换
        return result;
    }

    /**
     * 简单的数字与字符串数组去重
     * @param  {Arrary} arr 待处理的数组
     * @return {Arrary}     返回去重后的数组
     */
    function uniqArray(arr) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] !== '' && result.indexOf(arr[i]) === -1) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    /**
     * 遍历数组.针对数组中每一个元素执行fn函数
     * 并将数组索引和元素作为参数传递
     * @param {Array} arr 待遍历的数组
     * @param {Function} fn 数组执行的函数
     *  @config {any} arr[i] 数组项
     *  @config {Number} i 索引
     */
    function each(arr, fn) {
        for (var i = 0, l = arr.length; i < l; i++) { // 遍历传参
            fn(arr[i], i);
        }
    }

    /**
     * 判断某个元素是否有指定的className
     * @param {any} element 待查找的元素
     * @param {any} sClass 待查找的className
     * @returns {any} 查找到的时候返回该类名，未找到返回 false
     */
    function hasClass(element, sClass) {
        if (element && element.className) {
            return element.className.match(new RegExp('(\\s|^)' + sClass + '(\\s|$)'));
        } else {
            return false;
        }
    }

    /**
     * 为element增加一个样式名为newClassName的新样式
     * @param {HTMLElement} element 待添加样式的元素
     * @param {String} newClassName 待添加的 className
     */
    function addClass(element, newClassName) {
        if (!hasClass(element, newClassName)) {
            element.className += ' ' + newClassName;
        }
    }

    /**
     * 移除element中指定的className
     * @param {HTMLElement} element 待删除className的元素
     * @param {String} oldClassName 待删除的className
     */
    function removeClass(element, oldClassName) {
        if (hasClass(element, oldClassName)) {
            var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
            element.className = element.className.replace(reg, '');
        }
    }
    var gg = {};
    gg.addEvent = addEvent;
    gg.removeEvent = removeEvent;
    gg.trim = trim;
    gg.uniqArray = uniqArray;
    gg.each = each;
    gg.hasClass = hasClass;
    gg.addClass = addClass;
    gg.removeClass = removeClass;
    window.gg = gg;
})(window, document);