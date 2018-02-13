// pages/change-personal/change-personal.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        personalkey: null,
        personalValue: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            personalkey: options.personalKey || null,
            personalValue: options.personalValue || null
        })

    },
    // 保存并提交
    bindViewSaveBtn: function () {
        debugger
        var that = this;
        app.appRequest({
            url: "api/member/updateinfo",
            data: {
                type: that.data.personalkey,
                value: that.data.personalValue
            },
            success: function (res) {
                that.prevViewData();
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: 1,
                            })
                        }, 1500)
                    }
                })
            },
            fail: function (res) {

            }
        });
    },
    // 值发生变化
    changeDataInput: function (e) {
        var that = this;
        that.setData({
            personalValue: e.detail.value
        })
    },
    // // 将数据传递给上一个页面
    prevViewData: function (e) {
        var that = this;
        let pages = getCurrentPages();//当前页面
        let prevPage = pages[pages.length - 2];//上一页面
        let key = that.data.personalkey;
        let value = that.data.personalValue;
        let mobile = "info." + key;
        prevPage.setData({//直接给上移页面赋值
            [mobile]: value
        });

    }
})