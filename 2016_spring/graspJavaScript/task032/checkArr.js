var checkArr = [{
    min: 4,
    max: 16,
    isPassed: false,
    rules: '必填，长度为4-16个字符',
    success: '名称可用',
    error: '长度为4-16个字符',
}, {
    min: 6,
    isPassed: false,
    rules: '密码应该大于6位且由字母和数字混合组成',
    success: '密码可用',
    error: '密码应该大于6位且由字母和数字混合组成',
}, {
    isPassed: false,
    rules: '邮箱应该以类似@gmail.com的格式编写',
    success: '邮箱可用',
    error: '邮箱格式错误',
}, {
    isPassed: false,
    rules: '请正确填写11位手机号码',
    success: '手机格式正确',
    min: 11,
    error: '手机格式错误',
}];