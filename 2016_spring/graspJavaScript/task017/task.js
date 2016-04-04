/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

function randomColor() {
    var color = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
    return color;
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
console.log(aqiSourceData["北京"])
    // 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
};
var chartWrap = document.getElementById("aqi-chart-wrap"); //条形图容器
var radio = document.getElementById("form-gra-time").getElementsByTagName("input"); //单选框
var citySelect = document.getElementById("city-select"); //下拉框
/**
 * 渲染图表
 */

function renderChart() {
    /**
     * 立即执行函数，返回获取初始化数据获取的值，与应该设置的宽度
     * @param  {String} nowGraTime 选择的按照天或周或月显示
     * @return {Arrary} 返回去chartData对象获取数据的键，与条形宽度
     */
    var timeFormat = (function(nowGraTime) {
        if (nowGraTime == "week") {
            return ["weekAqi", "6%"];
        } else if (nowGraTime == "month") {
            return ["monthAqi", "30%"];

        } else {
            return ["aqi", "1.01%"];
        }
    })(pageState.nowGraTime);

    chartWrap.innerHTML = ""; //不这样写就一直叠加了

    for (var i in chartData[timeFormat[0]]) {
        chartWrap.innerHTML += "<div title='" + i + "\nvalue: " + chartData[timeFormat[0]][i] + "'style='height:" + chartData[timeFormat[0]][i] + "px;width:" + timeFormat[1] + ";background:" + randomColor() + ";'></div>";
    }
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    for (var i = 0, len = radio.length; i < len; i++) {
        if (radio[i].checked) {
            pageState.nowGraTime = radio[i].value;
            console.log(pageState.nowGraTime);
        }
    }
    // 调用图表渲染函数
    initAqiChartData();
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    pageState.nowSelectCity = citySelect.value;
    console.log(pageState.nowSelectCity);
    // 调用图表渲染函数
    initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    for (var i = 0, len = radio.length; i < len; i++) {
        radio[i].addEventListener("change", graTimeChange, false);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener("change", citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var provisional = aqiSourceData[pageState.nowSelectCity];

    chartData.weekAqi = {}; //周数据
    chartData.monthAqi = {}; //月数据
    var aqiLenght = Object.keys(provisional).length; //获取到总共的数据个数

    // 处理好的数据存到 chartData 中
    chartData.aqi = provisional; //每一天的数据
    (function() {
        var cont = 0;
        var sum = 0;
        if (pageState.nowGraTime == "week") {
            for (var item in provisional) {
                sum += provisional[item];
                cont++;
                if (cont % 7 === 0) {
                    chartData.weekAqi['第' + parseInt(cont / 7) + '周'] = parseInt(sum / 7);
                    sum = 0;
                }
            }
            if (cont % 7) {
                chartData.weekAqi['第' + (parseInt(cont / 7) + 1) + '周'] = parseInt(sum / (cont % 7));
            }
        }
    })();
    (function() {
        var mon = 1;
        var d = new Date(2016, mon, 0);
        var cont = 0;
        var sum = 0;
        var arr = [];
        if (pageState.nowGraTime == "month") {
            for (var item in provisional) {
                sum += provisional[item];
                cont++;
                if (cont == d.getDate()) {
                    chartData.monthAqi['第' + mon + '月'] = parseInt(sum / d.getDate());
                    cont = 0;
                    sum = 0;
                    mon++;
                    d = new Date(2016, mon, 0);
                }
            }
        }
    })();
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
