// pages/us-set/us-set.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      hasset:false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      app.appRequest({
        url: "api/member/checkpaypassword",
        success: function (res) {
          that.setData({
            hasset: res.hasset
          })
        },
        fail: function (res) {

        }
      });
    },
    // 修改密码
    bindViewChangePassword: function () {
        var that =this;
        var oldWriteState = that.data.hasset;
        wx.navigateTo({
          url: '../change-pay-password/change-pay-password??oldWriteState=' + oldWriteState,
        })
    },
    // 忘记密码
    bindViewFindPassword: function () {
        wx.navigateTo({
            url: '../find-password/find-password',
        })
    },

})