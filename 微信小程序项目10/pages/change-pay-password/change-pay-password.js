// pages/full-money/full-money.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldWriteState:true,
    oldPayPassword:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 当用户输入原密码时自定义函数
  valueSixOld() {
    console.log("0");
  },
  // 当用户第一次输入新密码时自定义函数
  valueSixNewOne() {
    console.log("1");
  },
  // 当用户第二次输入新密码时自定义函数
  valueSixNewTwo() {
    console.log("2");
  },
  // 验证旧的支付密码
  nextBtn:function(){
    debugger

  },
  // 保存新的支付密码
  saveBtn: function () {

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