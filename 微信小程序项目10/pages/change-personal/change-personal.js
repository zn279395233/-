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
        popErrorMsg:"",
        _num:1
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
      if (this.data.personalValue != null && this.data.personalValue.length != 0){
        if (this.data.personalkey == "mobile" && !(myreg.test(this.data.personalValue))){
          this.setData(
            { _num: 2, popErrorMsg: "手机号错误" },
          );
          setTimeout(() => {
            this.setData(
              { _num: 1,},
            );
            
          }, 1500);
          return false
        }
        else if (this.data.personalkey == "ID_CARD" && !(isIDCard.test(this.data.personalValue))){
          this.setData(
            { _num: 2, popErrorMsg: "身份证号错误" },
          );
          setTimeout(() => {
            this.setData(
              { _num: 1, },
            );
          }, 1000);
          return false
        }
      }
      if (this.data.personalValue == null){
        this.setData(
          { personalValue: "" },
        );
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
                if (that.data.personalkey == "mobile") {
                  app.globalData.mobile = that.data.personalValue
                }
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
              that.setData(
                { _num: 2, popErrorMsg: res.return_msg },
              );
              setTimeout(() => {
                that.setData(
                  { _num: 1, },
                );
              }, 1000);
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