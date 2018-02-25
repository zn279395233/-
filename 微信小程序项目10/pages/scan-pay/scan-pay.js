var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},//数据
    showModal: false,   //备注模态框
    showModalPay: false, //转账模态框
    content: null,  //二维码内容,
    remark:""//备注
  },
  // * 生命周期函数--监听页面加载
  // * /
  onLoad: function (options) {
    var content = options.content;
    var that = this;
    app.appRequest({
      url: "api/scan/getscaninfo",
      data:{
        content:content
      },
      success: function (res) {
        if (res.return_code == "1011") {//支付密码未设置
          wx.navigateTo({
            url: '../index/index?isHasPayPassword=true',
          });
        } else {
          that.setData({
            info: res.data
          })
        }
      },
      fail: function (res) {

      }
    });
  
  },
  // 金额输入
  amountInput: function (e) {
    var that = this;
    that.setData({
      amount: e.detail.value
    })
  },
  // 提交数据到后台
  submitBtn:function(){
    var that = this;
    app.appRequest({
      url: "api/scan/getscaninfo",
      data: {
        amount: that.data.amount,
        merchant_id: that.data.info.merchantID,
        pay_password:"",
        remark: that.data.remark,
        serial_number: that.data.merchant_id,
      },
      success: function (res) {
        
      },
      fail: function (res) {
      }
    });
  },
  // 显示
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  // 弹出支付窗口
  showDialogPayBtn: function () {
    this.setData({
      showModalPay: true
    })
  },
  // 隐藏
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  // 隐藏支付窗口
  hideDialogPayBtn: function () {
    this.setData({
      showModalPay: false
    })
  },
  
  // 取消
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  // 确认
  onConfirm: function () {
    this.hideModal();
  },
  /**
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