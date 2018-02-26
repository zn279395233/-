// pages/charge-money/charge-money.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:null, //金额
    card_code:null //电子卡号
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    app.appRequest({
      url: "api/account/recharge",
      data:{

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
  //电子卡号值发生改变
  cardCodeInput:function(e){
    var that = this;
    that.setData({
      card_code:e.detail.value
    })
  }, 
  //充值金额值发生改变
  amountInput: function (e) {
    var that = this;
    that.setData({
      amount: e.detail.value
    })
   
  }, 
  // 选择优惠充值
  selectAmount:function(e){
    var that = this;
    that.setData({
      amount: e.currentTarget.dataset.amount
    })
    console.log(that.data.amount)
  },
  // 转账
  withdrawBtn:function(){
    var that = this;
    app.appRequest({
      url: "api/account/recharge",
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