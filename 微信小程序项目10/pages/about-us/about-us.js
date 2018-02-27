var app = getApp();
// pages/about-us1/about-us1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        card_code:""

    },
    onLoad: function () {
        var that = this;
        that.setData({
          userInfo: app.globalData.options.userInfo
        })
        app.appRequest({
          url: "api/member/info",
          success: function (res) {

          },
          fail: function (res) {

          }
        });
        var card_code = wx.getStorageSync('card_code');
        that.setData({
          card_code: card_code
        })

    },
    // 个人资料
    bindViewPersonal: function () {
        wx.navigateTo({
            url: '../personal-data/personal-data',
        })
    },
    // 常见问题
    bindViewQuestion: function () {
      wx.navigateTo({
        url: '../common-question/common-question',
      })
    },
    // 投诉建议
    bindViewSuggest: function () {
      wx.navigateTo({
        url: '../member-suggest/member-suggest',
      })
      
    },
    // 设置
    bindViewSet: function () {
        wx.navigateTo({
            url: '../us-set/us-set',
        })
    },
})