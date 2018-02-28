// pages/find-password/find-password.js
var app = getApp();
var myreg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    popErrorMsg: "",//提示内容
    _num: 1,//提示是否显示
    mobile:"",//手机号
    code:"",//验证码,
    isHasPhone:false,//
    valid_code:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.mobile != null) {
      that.setData({
        isHasPhone: false
      })
    } else {
      var that = this;
      app.appRequest({
        url: "api/member/info",
        success: function (res) {
          var mobile = res.data.mobile;
          if (mobile == null || mobile == "" || typeof mobile == "undefined") {
            that.setData({
              isHasPhone: true
            })
          } else {
            that.setData({
              isHasPhone: false
            })
          }
        },
        fail: function (res) {

        }
      });
    }
  },
  // 获取验证码
  getVerifyCode:function(){
    var that = this;
    that.vertify();
    if (that.data._num != "2") {
      app.appRequest({
        url: "api/verifycode/send",
        data:{
          mobile: that.data.mobile,
          scene: "PAY_PASSWORD"
        },
        success: function (res) {
          that.setData({
            valid_code: res.data.valid_code
          })
        },
        fail: function (res) {
          
        }
      });
    }
  },
  // 手机号
  amountInput: function (e) {
    var that = this;
    that.setData({
      mobile: e.detail.value
    })
  },
  // 提交
  saveBtn: function () {
    var that = this;
    that.vertify();
    if (that.data._num != "2"){
      //将提交给后台
      app.appRequest({
        url: "api/verifycode/valid",
        data: {
          scene: "PAY_PASSWORD",
          valid_code: that.data.valid_code,
          mobile: that.data.mobile,
        },
        success: function (res) {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        },
        fail: function (res) {

        }
      });
    }
  },
  // 隐藏完善手机号提示框
  hideModal: function () {
    var that = this;
    that.setData({
      isHasPhone: false
    })
  },
  // 验证
  vertify:function(){
    if (this.data.mobile.length == 0) {
      this.setData(
        { _num: 2, popErrorMsg: "手机号不能为空" },
      );
      setTimeout(() => {
        this.setData(
          { _num: 1, },
        );

      }, 1500);
    }
    if (!(myreg.test(this.data.mobile))) {
      this.setData(
        { _num: 2, popErrorMsg: "手机号码不错误" },
      );
      setTimeout(() => {
        this.setData(
          { _num: 1, },
        );
      }, 1500);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})