// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return typeof (arr) === 'object' && Object.prototype.toString.call(arr) === '[object Array]';
}


// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof (fn) === 'function';
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var result; // 返回的复制后的结果。
    if (typeof (src) === 'object') {
        // 对象为日期对象时也直接赋值。
        if (Object.prototype.toString.call(src) === '[object Date]') {
            result = src;
        } else {
            // 判断对象的类型是Array还是Object，结果类型更改。
            result = (Object.prototype.toString.call(src) === '[object Array]') ? [] : {};
            for (var i in src) {
                if (src.hasOwnProperty(i)) { // 排除继承属性
                    if (typeof src[i] === 'object') {
                        result[i] = cloneObject(src[i]); // 递归赋值
                    } else {
                        result[i] = src[i]; // 直接赋值
                    }
                }
            }
        }
    } else {
        // 对于原始类型直接赋值。
        result = src;
    }
    return result;
}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var result = []; // 创建一个新数组。
    for (var i = 0, l = arr.length; i < l; i++) {
        if (result.indexOf(arr[i]) === -1) { // 查找是否已经含有该元素
            result.push(arr[i]); // 添加到新数组
        }
    }
    return result; // 返回新数组

}

// 实现一个简单的`trim`函数，用于去除一个字符串，头部和尾部的空白字符
// 1.字符串查找
function simpleTrim(str) {
    // your implement
    var result = '';
    for (var i = 0, il = str.length; i < il; i++) { // 从头查找
        if (str[i] != ' ' && str[i] != '\t') {
            break; // 查找到第一个不为空格及tab符的元素
        }

    }
    for (var j = str.length - 1; j >= 0; j--) { // 从尾查找
        if (str[j] != ' ' && str[j] != '\t') {
            break;
        }

    }
    result = str.slice(i, j + 1); // 截取需要的字符串。
    return result;
}
// 2.正则
function trim(str) {
    // your implement
    var result = '';
    result = str.replace(/^\s+|\s+$/g, ''); // 使用正则进行字符串替换
    return result;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for (var i = 0, l = arr.length; i < l; i++) { // 遍历传参
        fn(arr[i], i);
    }
}


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
}


// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var reg = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var reg = /^1\d{10}$/;
    return reg.test(phone);
}

// 语言基础部分结束


// DOM部分
function hasClass(element, sClass) {
    if (element && element.className) {
        return element.className.match(new RegExp('(\\s|^)' + sClass + '(\\s|$)'));
    } else {
        return false;
    }
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        element.className += ' ' + newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
        element.className = element.className.replace(reg, '');
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var position = {};
    position.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); // 获取相对位置+滚动距离=绝对位置.
    position.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    return position;
}

/**
 * $函数的依赖函数，选择器函数
 * @param   {string} selector CSS方式的选择器
 * @param   {object} root     可选参数，selector的父对象。不存在时，为document
 * @returns {Array}  返回获取到的节点数组，需要注意的是使用ID选择器返的也是数组
 */
function VQuery(selector, root) {
    // 用来保存选择的元素
    var elements = []; // 保存结果节点数组
    var allChildren = null; // 用来保存获取到的临时节点数组
    root = root || document; // 若没有给root，赋值document
    switch (selector.charAt(0)) {
        case '#': // id选择器
            elements.push(root.getElementById(selector.substring(1)));
            break;
        case '.': // class选择器
            if (root.getElementsByClassName) { // 标准
                elements = root.getElementsByClassName(selector.substring(1));
            } else { // 兼容低版本浏览器
                var reg = new RegExp('\\b' + selector.substring(1) + '\\b');
                allChildren = root.getElementsByTagName('*');
                for (var i = 0, len = allChildren.length; i < len; i++) {
                    if (reg.test(allChildren[i].className)) {
                        elements.push(allChildren[i]);
                    }
                }
            }
            break;
        case '[': // 属性选择器

            if (selector.indexOf('=') === -1) {
                // 只有属性没有值的情况
                allChildren = root.getElementsByTagName('*');
                for (var i = 0, len = allChildren.length; i < len; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        elements.push(allChildren[i]);
                    }
                }
            } else {
                // 既有属性又有值的情况
                var index = selector.indexOf('='); // 缓存=出现的索引位置。
                allChildren = root.getElementsByTagName('*');
                for (var i = 0, len = allChildren.length; i < len; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, index)) === selector.slice(index + 1, -1)) {
                        elements.push(allChildren[i]);
                    }
                }
            }
            break;
        default: // tagName
            elements = root.getElementsByTagName(selector);
    }
    return elements;
}

/**
 * 模仿jQuery的迷你$选择符。
 * @param   {string} selector CSS方式的选择器，支持简单的后代选择器（只支持一级）
 * @returns {object} 返回获取到的第一个节点对象，后代选择器时，返回第一个对象中的第一个符合条件的对象
 */
function $(selector) {
    if (selector == document) {
        return document;
    }
    selector = trim(selector);
    // 存在空格时，使用后代选择器
    if (selector.indexOf(' ') !== -1) {
        var selectorArr = selector.split(/\s+/); // 分割成数组，第一项为parent，第二项为chlid。
        // 这里没去考虑特别多的情况了，只是简单的把参数传入。
        return VQuery(selectorArr[1], VQuery(selectorArr[0])[0])[0];
    } else { // 普通情况,只返回获取到的第一个对象
        return VQuery(selector, document)[0];
    }
}

// 事件。
/**
 * 事件添加函数
 * @param {object}   element  需要绑定事件的对象
 * @param {string}   event    事件类型
 * @param {function} listener 事件触发执行的函数
 */
function addEvent(element, event, listener) {
    if (element.addEventListener) { // 标准
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) { // 低版本ie
        element.attachEvent('on' + event, listener);
    } else { // 都不行的情况
        element['on' + event] = listener;
    }
}

/**
 * 事件移除函数
 * @param {object}   element  需要移除事件的对象
 * @param {string}   event    事件类型
 * @param {function} listener 需要被移除事件函数
 */
function removeEvent(element, event, listener) {
    // your implement
    if (element.removeEventListener) { // 标准
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) { // 低版本ie
        element.detachEvent('on' + event, listener);
    } else { // 都不行的情况
        element['on' + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}
// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    addEvent(element, 'keydown', function(ev) {
        // 兼容性处理。
        var oEvent = ev || window.event;
        if (oEvent.keyCode === 13) {
            listener();
        }
    });
}

/**
 * 事件代理
 * @param   {HTMLElement}   element   需要进行事件代理的父元素。
 * @param   {string}   tag       需要触发事件的标签名
 * @param   {string}   eventName 触发的事件类型
 * @param   {function} listener  事件执行的函数
 */
function delegateEvent(element, tag, eventName, listener) {
    // your implement
    return addEvent(element, eventName, function(ev) {
        var oEvent = ev || event; // 兼容处理
        var target = oEvent.target || oEvent.srcElement; // 兼容处理
        if (target.tagName.toLocaleLowerCase() === tag) {
            listener.call(target, oEvent); // 使用call方法修改执行函数中的this指向，现在this指向触发了事件的HTML节点（可直接使用this.innerHTML返回该节点内容）
        }
    });
}


// 把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = function(selector, event, listener) {
    return addEvent($(selector), event, listener);
};
$.un = function(selector, event, listener) {
    return removeEvent($(selector), event, listener);
};
$.click = function(selector, listener) {
    return addClickEvent($(selector), listener);
};
$.enter = function(selector, listener) {
    return addEnterEvent($(selector), listener);
};
$.delegate = function(selector, tag, eventName, listener) {
    return delegateEvent($(selector), tag, eventName, listener);
};


// BOM

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var uUserAgent = navigator.userAgent; // 保存浏览器的userAgent
    var ieAgent = uUserAgent.match(/rv:(\d+.\d+)/i) || uUserAgent.match(/msie (\d+.\d+)/i); // 这里是为了处理到ie11
    if (ieAgent) {
        return ieAgent[1];
    } else {
        return -1;
    }
}

/**
 * 设置cookie
 * @param {String} cookieName  设置cookie名
 * @param {String} cookieValue 对对应的cookie名
 * @param {Number} expiredays  过期的时间(多少天后)
 */
function setCookie(cookieName, cookieValue, expiredays) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + expiredays);
    document.cookie = cookieName + '=' + cookieValue + ';expires=' + oDate;
}

/**
 * 获取cookie
 * @param   {String} cookieName 待寻找的cookie名
 * @returns {String} 返回寻找到的cookie值,无时为空
 */
function getCookie(cookieName) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == cookieName) {
            return arr2[1];
        }
    }
    return '';
}

/**
 * 删除cookie
 * @param {String} cookieName 待删除的cookie名
 */
function removeCookie(cookieName) {
    setCookie(cookieName, '1', -1);
}


/**
 * AJAX函数封装
 * @param {string} url     请求地址（必须）
 * @param {object} options 发送请求的选项参数
 *   @config {string} [options.type] 请求发送的类型。默认为GET。
 *   @config {Object} [options.data] 需要发送的数据。
 *   @config {Function} [options.onsuccess] 请求成功时触发，function(oAjax.responseText, oAjax)。（必须）
 *   @config {Function} [options.onfail] 请求失败时触发，function(oAjax)。(oAJax为XMLHttpRequest对象)
 *
 *@returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
function ajax(url, options) {
    // 1.创建ajax对象
    var oAjax = null;

    /**
     * 此处必须需要使用window.的方式,表示为window对象的一个属性.不存在时值为undefined,进入else
     * 若直接使用XMLHttpRequest,在不支持的情况下会报错
     **/
    if (window.XMLHttpRequest) {
        // IE6以上
        oAjax = new XMLHttpRequest();
    } else {
        oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 2.连接服务器
    // open(方法,url,是否异步)
    var param = ''; // 请求参数。
    // 只有data存在，且为对象使才执行
    var data = options.data ? options.data : -1; // 缓存data
    if (typeof (data) === 'object') {
        for (var key in data) { // 请求参数拼接
            if (data.hasOwnProperty(key)) {
                param += key + '=' + data[key] + '&';
            }
        }
        param.replace(/&$/, '');
    } else {
        param = 'timestamp=' + new Date().getTime();
    }

    // 3.发送请求
    var type = options.type ? options.type.toUpperCase() : 'GET';
    if (type === 'GET') {
        oAjax.open('GET', url + '?' + param, true);
        oAjax.send();
    } else {
        oAjax.open('POST', url, true);
        oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        oAjax.send(param);
    }

    // 4.接收返回
    // OnRedayStateChange事件
    oAjax.onreadystatechange = function() {
        if (oAjax.readyState === 4) {
            if (oAjax.status === 200) {
                // 请求成功。形参为获取到的字符串形式的响应数据
                options.onsuccess(oAjax.responseText, oAjax);
            } else {
                // 先判断是否存在请求失败函数
                // 存在时，形参为XMLHttpRequest对象，便于进行错误进行处理
                if (options.onfail) {
                    options.onfail(oAjax);
                }
            }
        }
    };
    return oAjax; // 发送请求的XMLHttpRequest对象
}




/**
 * 获取当前元素在同级元素的索引
 * @param   {HTMLElement} element html节点
 * @returns {number} 索引
 */
function getIndex(element) {
    var aBrother = element.parentNode.children;
    for (var i = 0, len = aBrother.length; i < len; i++) {
        if (aBrother[i] === element) {
            return i;
        }
    }
}

/**
 * 获取实际样式函数
 * @param   {HTMLElement}   element  需要寻找的样式的html节点
 * @param   {String]} attr 在对象中寻找的样式属性
 * @returns {String} 获取到的属性
 */
function getStyle(element, attr) {
    // IE写法
    if (element.currentStyle) {
        return element.currentStyle[attr];
        // 标准
    } else {
        return getComputedStyle(element, false)[attr];
    }
}

/**
 * 完美运动框架
 * @param {HTMLElement} element 运动对象
 * @param {JSON}        json    属性：目标值
 *   @property {String} attr    属性值
 *   @config   {Number} target  目标值
 * @param {function}    func    可选，回调函数，链式动画。
 */
function startMove(element, json, func) {
    clearInterval(element.timer);
    var flag = true; // 假设所有运动到达终点.
    element.timer = setInterval(function() {
        for (var attr in json) {
            // 1.取当前的属性值。
            var iCurrent = 0;
            if (attr === 'opacity') { // 为透明度时执行。
                iCurrent = Math.round(parseFloat(getStyle(element, attr)) * 100);
            } else { // 默认情况
                iCurrent = parseInt(getStyle(element, attr)); // 实际样式大小
            }
            // 2.算运动速度,动画缓冲效果
            var iSpeed = (json[attr] - iCurrent) / 10; // (目标值-当前值)/缩放系数=速度
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); // 速度取整
            // 3.未到达目标值时，执行代码
            if (iCurrent != json[attr]) {
                flag = false; // 终止条件
                if (attr === 'opacity') { // 为透明度时，执行
                    element.style.filter = 'alpha(opacity:' + (iCurrent + iSpeed) + ')'; // IE
                    element.style.opacity = (iCurrent + iSpeed) / 100; // 标准
                } else { // 默认
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }
            // 4. 运动终止，是否回调
            if (flag) {
                clearInterval(element.timer);
                if (func) {
                    func();
                }
            }
        }
    }, 30);
}
