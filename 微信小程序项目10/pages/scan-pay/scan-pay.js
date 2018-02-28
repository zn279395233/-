var md5 = require("../../utils/md5.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},//数据
    showModal: false,   //备注模态框
    remarkinfo:false,  //备注修改
    showModalPay: false, //转账模态框
    content: null,  //二维码内容,
    modalInput: null,
    remark: "",//备注,
    pay_password: "",//支付密码
    amount: "",//金额
    remarkinfos:"true",
    infos:"",
    showModalError:false,//支付失败模态框
    msg:"",//提示错误信息
    auto_focus:true//"是否自动弹出"
  },
  // * 生命周期函数--监听页面加载
  // * /
  onLoad: function (options) {
    var content = options.content;
    var that = this;
    app.appRequest({
      url: "api/scan/getscaninfo",
      data: {
        content: content
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
  // 备注输入
  inputChange: function (e) {
    var that = this;
    that.setData({
      remark: e.detail.value
    })
  },
  // 提交数据到后台
  submitBtn: function () {
    var that = this;
    if (that.data.pay_password.length >= 6){
      var serial_number = new Date().getTime();
      var pay_password = md5.md5(md5.md5(that.data.pay_password) + serial_number);
      app.appRequest({
        url: "api/scan/transfer",
        data: {
          amount: parseInt(that.data.amount * 100),
          merchant_id: that.data.info.merchantID,
          pay_password: pay_password,
          remark: that.data.remark,
          serial_number: serial_number.toString(),
        },
        success: function (res) {
          if (res.return_code == "1001") {//商户不存在
            that.setData({
              showModalError: true,
              msg: res.return_msg,
              pay_password:""
            })
            setTimeout(function(){
              that.setData({
                showModalError: false,
                msg: "",
              })
              wx.navigateBack({
                delta: 1,
              })
            },1500)
          }else{
            var trade_id = res.data.trade_id;
            wx.navigateTo({
              url: '../pay-success/pay-success?trade_id=' + trade_id,
            });
          } 
        },
        fail: function (res) {
          // if (res.return_code == "1009") {//支付密码不正确
            that.hideDialogPayBtn();//隐藏转账弹框
            that.setData({
              showModalError: true,
              msg: res.return_msg,
              pay_password: ""
            })
            console.log(that.data)
            
          // }     
        }
      });
    }
  },
  // 当用户输入原密码时自定义函数
  valueSixOld() {
    var that = this;
    var oldSixValueBox = that.selectComponent("#oldSixValueBox");
    that.setData({
      pay_password: oldSixValueBox.data.input_value
    })
    // oldSixValueBox.data.input_value="";
    // oldSixValueBox.data.value_length = 0;
    // consoel.log(that.selectComponent("#oldSixValueBox").data)
    that.submitBtn();
  },
  // 显示
  showDialogBtn: function () {
    var that = this;
    that.setData({
      showModal: true
    })
  },
  // 弹出支付窗口
  showDialogPayBtn: function (event) {
    // event.preventDefault();
    var that = this;
    if (that.data.amount != "" && that.data.amount > 0){
      that.setData({
        showModalPay: true,
      })
      that.submitBtn();
    }
  },
  // 取消错误弹框
  onCancelError:function(){
    var that = this;
    that.setData({
      showModalPay: true,
      showModalError: false,
      msg: ""
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
    if(this.data.remark.length > 0){
      this.setData({
        remarkinfo: true,
        remarkinfos:false,
        infos: this.data.remark
      })
    }
    else{
      this.setData({
        remarkinfo: false,
        remarkinfos: true
      })
    }
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