var checkArr = {
    input: {
        'text': {
            isPassed: false,
            name: '名称',
            type: 'text',
            reg: /^\w+$/,
            rules: '必填，长度为4-16个字符',
            success: '名称可用',
            error: '长度为4-16个字符',
        },
        'number': {
            isPassed: false,
            name: '数字',
            type: 'number',
            reg: /^\d+$/,
            rules: '请输入数字',
            success: '验证通过',
            error: '请全部输入数字',
        },
        'password': {
            isPassed: false,
            name: '密码',
            type: 'password',
            reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
            rules: '密码应该大于6位且由字母和数字混合组成',
            success: '密码可用',
            error: '密码应该大于6位且由字母和数字混合组成',
        },
        'tel': {
            isPassed: false,
            name: '电话',
            type: 'tel',
            reg: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            rules: '请正确填写11位手机号码',
            success: '手机格式正确',
            min: 11,
            error: '手机格式错误',
        },
        'email': {
            isPassed: false,
            name: '邮箱',
            type: 'email',
            reg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            rules: '邮箱应该以类似@gmail.com的格式编写',
            success: '邮箱可用',
            error: '邮箱格式错误',
        },
    },
    textarea: {
        name: '文本域',
    },
    radio: {
        name: '单选框',
    },
    checkbox: {
        name: '复选框',
    },
    select: {
        name: '下拉框',
    },
};