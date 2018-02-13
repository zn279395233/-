// pages/us-set/us-set.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 修改密码
    bindViewChangePassword: function () {
        wx.navigateTo({
            url: '../change-pay-password/change-pay-password',
        })
    },
    // 修改密码
    bindViewFindPassword: function () {
        wx.navigateTo({
            url: '../find-password/find-password',
        })
    },

})