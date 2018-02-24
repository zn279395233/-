// pages/withdraw-deposit/withdraw-deposit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     card_code:null,//电子会员卡
     frozen_balance:null,//冻结余额
     isuse_balance:null,//可用余额
     total_balance:null,//总余额
     amount:100,
     info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // var that = this;
    // app.appRequest({
    //   url: "api/card/info",
    //   success: function (res) {
    //     that.setData({
    //       info: res.data
    //     })
    //   },
    //   fail: function (res) {

    //   }
    // });
  },
  //提现金额值发生改变
  amountInput: function (e) {
    var that = this;
    that.setData({
      amount: e.detail.value
    })
  }, 

  // 提现
  withdrawBtn: function () {
    var that = this;
    app.appRequest({
      url: "api/account/cash",
      data: {
        amount: that.data.amount,
        card_code: that.data.card_code
      },
      success: function (res) {
        that.setData({
          info: res.data
        })
      },
      fail: function (res) {

      }
    });
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