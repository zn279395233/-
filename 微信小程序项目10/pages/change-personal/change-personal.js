// pages/change-personal/change-personal.js
// pages/change-personal/change-personal.js
var app = getApp();
var myreg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
var isIDCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
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
      if (this.data.personalValue != null || this.data.personalValue.length != 0){
        if (this.data.personalkey == "MOBILE" && !(myreg.test(this.data.personalValue))){
          wx.showToast({
            title: '手机号输入错误',
            icon: 'success',
            duration: 1500
          })
        }
        else if (this.data.personalkey == "ID_CARD" && !(isIDCard.test(this.data.personalValue))){
          wx.showToast({
            title: '身份证号错误',
            icon: 'success',
            duration: 1500
          })
        }
        return false;
      }


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