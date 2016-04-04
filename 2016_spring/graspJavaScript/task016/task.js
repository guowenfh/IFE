/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var oTable = document.getElementById("aqi-table");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim(); //城市输入框的值
    var cityValue = document.getElementById("aqi-value-input").value.trim(); //质量数据输入框的值
    var warnInfo = document.getElementById("warn-info"); //提示信息
    if (city === "" || /[^\u4e00-\u9fa5a-z+]/gmi.test(city)) {
        warnInfo.innerHTML = "城市只能输入中文或字母";
        return;
    } else if (cityValue === "" || !/^\d+$/.test(cityValue)) {
        warnInfo.innerHTML = "空气质量必须输入整数数字";
        return;
    } else {
        warnInfo.innerHTML = "";
        if (aqiData[city] !== cityValue) {
            aqiData[city] = cityValue;
        } else {
            return;
        }
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    oTable.innerHTML = "<thead><tr><td>城市</td><td>空气质量</td><td>操作</td></tr></thead>";
    for (var i in aqiData) {
        if (aqiData.hasOwnProperty(i)) {
            oTable.innerHTML += "<tr><td>" + i + "</td><td>" + aqiData[i] + "</td><td><button>删除</button></td></tr>";
        }
    }
    if (oTable.getElementsByTagName("button").length) {
        oTable.style.display = "block";
    } else {
        oTable.style.display = "none";
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var removeTd = target.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
    delete aqiData[removeTd];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btn = document.getElementById("add-btn");
    btn.addEventListener("click", addBtnHandle, false);

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    oTable.addEventListener("click", function(e) {
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        if (target.tagName.toLowerCase() === "button") {
            delBtnHandle(target);
        }
    }, false);

}

init();
