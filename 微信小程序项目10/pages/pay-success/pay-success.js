var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      amount:"",//金额
      pay_remark:"",//备注
      receiver:""//商户姓名
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var trade_id = options.trade_id;
      var that=this;
      app.appRequest({
        url: "api/scan/transferresult",
        data: {
          trade_id: trade_id,
        },
        success: function (res) {
          var info = res.data;
          wx.showToast({
            title: info.amount,
          })
          that.setData({
            amount: info.amount,//金额
            pay_remark: info.pay_remark,//备注
            receiver: info.receiver//商户姓名
          })
        },
        fail: function (res) {
        }
      });

    },
    goHome:function(){
      wx.navigateTo({
        url: '../index/index',
      })
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