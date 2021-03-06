// pages/money-detail/money-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.orderNumber;
    var that = this;

    app.appRequest({
      url: "api/account/detail",
      data: {
        id: id
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
  // 常见问题
  bindViewQuestion: function () {
    wx.navigateTo({
      url: '../common-question/common-question',
    })
  },
  // 投诉建议
  bindViewSuggest: function () {
    wx.navigateTo({
      url: '../member-suggest/member-suggest',
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