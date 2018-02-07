var app = getApp();
Page({
    data: {
        info: {
            userName: "姓名",
            userValue: "赵宁",
            memberName: "会员号",
            memberValue: "000000001",
            contactNmae: "手机号",
            contactValue: "13298317375",
            idName: "身份证号",
            idValue: "418175188515151313",
            userLocationName: "我的地址",
            userLocationValue: "河南省郑州市巩义市米河镇小里河村9组",
        },
        userInfo: {}
    },
    userNameInput: function (e) {
        return e.detail.value
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    }
});

