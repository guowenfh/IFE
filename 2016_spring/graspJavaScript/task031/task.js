/*global gg */
(function(window, document) {
    'use static';

    /**
     * 在校生与非在校生的选项
     */
    function isStudent() {
        var studentType = document.getElementById('student-type').getElementsByTagName('input');
        var citySchool = document.getElementById('city-school');
        var workPlace = document.getElementById('work-place');
        gg.each(studentType, function(item, index) {
            gg.addEvent(item, 'click', function() {
                if (this.value === '在校生') {
                    citySchool.style.display = 'block';
                    workPlace.style.display = 'none';
                } else {
                    citySchool.style.display = 'none';
                    workPlace.style.display = 'block';
                }
            });
        });
    }
    /**
     * 初始化城市列表
     * @param {any} schoolMap 城市json
     */
    function initCity(schoolMap) {
        var city = document.getElementById('city');
        var school = document.getElementById('school');
        var temp = '';
        gg.each(schoolMap, function(item, index) {
            temp += '<option value="' + item.city + '"' + (!index ? 'selected' : '') + '>' + item.city + '</option>';
        });
        city.innerHTML = temp;
        temp = '';
        gg.each(schoolMap[0].data, function(item, index) {
            temp += '<option value="' + item + '"' + (!index ? 'selected' : '') + '>' + item + '</option>';
        });
        school.innerHTML = temp;
    }

    /**
     * 城市更改时学校也更改
     * @param {any} schoolMap 城市json
     */
    function changeCity(schoolMap) {
        var city = document.getElementById('city');
        var school = document.getElementById('school');
        gg.addEvent(city, 'change', function() {
            var currValue = this.options[this.selectedIndex].value;
            var temp = '';
            gg.each(schoolMap, function(item) {
                if (item.city === currValue) {
                    gg.each(item.data, function(item, index) {
                        temp += '<option value="' + item + '"' + (!index ? 'selected' : '') + '>' + item + '</option>';
                    });
                    school.innerHTML = temp;
                }
            });
        });
    }


    /**
     *  函数初始化
     */
    function init() {
        isStudent();
        var schoolMap = [{
            city: '北京',
            data: ['北京大学', '中国人民大学', '清华大学', '北京交通大学', '北京科技大学', '中国石油大学', '北京邮电大学', '华北电力大学', '北京化工大学', '中国农业大学', '北京林业大学', '北京中医药大学', '北京师范大学', '北京外国语大学', '北京语言大学', '对外经济贸易大学', '中央财经大学', '中国政法大学', '中央民族大学', '中国人民公安大学', '北京协和医学院', '北京体育大学', '北京理工大学'],
        }, {
            city: '上海',
            data: ['第二军医大学', '东华大学', '复旦大学', '华东理工大学', '华东师范大学', '华东政法大学'],
        }, {
            city: '浙江',
            data: ['公安海警学院', '杭州电子科技大学', '杭州电子科技大学继续教育学院', '杭州科技职业技术学院', '杭州师范大学', '杭州万向职业技术学院'],
        }, {
            city: '重庆',
            data: ['重师涉外商贸学院', '重庆邮电大学移通学院', '重庆邮电大学', '重庆医药高等专科学校', '重庆医科大学', '重庆信息技术职业学院', '重庆文理学院'],
        }];
        initCity(schoolMap);
        changeCity(schoolMap);
    }
    init();
})(window, document);