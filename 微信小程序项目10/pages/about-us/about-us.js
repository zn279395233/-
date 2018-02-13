var app = getApp();
// pages/about-us1/about-us1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {}

    },
    onLoad: function () {
        var that = this;
        app.appRequest({
            url: "api/card/configinfo",
            success: function (res) {
                that.setData({
                    info: res.data
                })
            },
            fail: function (res) {

            }
        });
    },
    // 个人资料
    bindViewPersonal: function () {
        wx.navigateTo({
            url: '../personal-data/personal-data',
        })
    },
    // 常见问题
    bindViewPay: function () {
     
    },
    // 投诉建议
    bindViewWithdraw: function () {

    },
    // 设置
    bindViewSet: function () {
        wx.navigateTo({
            url: '../us-set/us-set',
        })
    },
})