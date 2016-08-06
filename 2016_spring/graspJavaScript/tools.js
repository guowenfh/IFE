(function (window, document) {

    /**
     * 事件添加函数,惰性载入
     * @param { Element  } ele     触发事件的Dom对象
     * @param { String   } event   触发的事件类型
     * @param { Fucntion } func    事件触发执行的函数
     */
    var addEvent = (function () {
        if (document.addEventListener) {
            return function (ele, event, func) {
                ele.addEventListener(event, func, false);
            };
        } else if (document.attachEvent) {
            return function (ele, event, func) {
                ele.attachEvent('on' + event, func);
            };
        } else {
            return function (ele, event, func) {
                ele['on' + event] = func;
            };
        }
    })();

    /*   function addEvent(ele,event,func){
           if(ele.addEventListener){
               addEvent = function(ele,event,func){
                   ele.addEventListener(event,func,false);
               };
           }else if(ele.attachEvent){
                addEvent = function(ele,event,func){
                   ele.attachEvent('on'+event,func);
               };
           }else{
                 addEvent = function(ele,event,func){
                   ele['on'+event] = func;
               };
           }
           return  addEvent(ele,event,func);
       }*/

    /**
     * 字符串去首尾空格
     * @param  {String} str     待处理字符串
     * @return {String}         处理后的字符串
     */
    function trim (str) {
        // your implement
        var result = '';
        result = str.replace(/^\s+|\s+$/g, ''); // 使用正则进行字符串替换
        return result;
    }

    /**
     * 简单的数字与字符串数组去重
     * @param  {Arrary} arr 待处理的数组
     * @return {Arrary}     返回去重后的数组
     */
    function uniqArray (arr) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] !== '' && result.indexOf(arr[i]) === -1) {
                result.push(arr[i]);
            }
        }
        return result;
    }
    window.addEvent = addEvent;
    window.trim = trim;
    window.uniqArray = uniqArray;
})(window, document);

