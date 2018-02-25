// pages/full-money/full-money.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popErrorMsg: "",
    _num: 1,
    oldWriteState:true,
    oldInputValue: null,//旧的支付密码值
    oldSixValueBox:null, //旧的支付密码包含框
    newInputValueOne: null,//第一个新的支付密码值
    newSixValueBoxOne: null, //第一个新的支付密码包含框
    newInputValueTwo: null,//第一个新的支付密码值
    newSixValueBoxTwo: null //第一个新的支付密码包含框
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this, oldWriteState;
    oldWriteState = options.oldWriteState == "false" ? false : true;
    debugger
    var oldSixValueBox = that.selectComponent("#oldSixValueBox");
    that.setData({
      oldSixValueBox: oldSixValueBox,
      oldWriteState: oldWriteState
    });
  },
  // 当用户输入原密码时自定义函数
  valueSixOld() {

  },
  // 当用户第一次输入新密码时自定义函数
  valueSixNewOne() {

  },
  // 当用户第二次输入新密码时自定义函数
  valueSixNewTwo() {

  },
  // 验证旧的支付密码
  nextBtn:function(){

    var that = this;
    var value = that.data.oldSixValueBox.data;
    if(value.input_value.length != 6){
      this.setData(
        { _num: 2, popErrorMsg: "支付密码至少为6位", get_focus: false, value_length: 0, input_value: "" },
      );
      setTimeout(() => {
        this.setData(
          { _num: 1, },
        );
      }, 1500);

      return false
    }else{
      this.setData(
        { oldWriteState: false},
      );
    }
    // app.appRequest({
    //   url: "api/card/configinfo",
    //   success: function (res) {
    //     that.setData({
    //       info: res.data
    //     })
    //   },
    //   fail: function (res) {

    //   }
    // });
  },
  go:function(){

  },
  // 保存新的支付密码
  saveBtn: function () {
    var that = this;
    var newSixValueBoxOne = that.selectComponent("#newSixValueBoxOne");
    var newSixValueBoxTwo = that.selectComponent("#newSixValueBoxTwo");
    that.setData({
      newSixValueBoxOne: newSixValueBoxOne,
      newSixValueBoxTwo: newSixValueBoxTwo
    });
    console.log(newSixValueBoxOne.data)
    var value1 = newSixValueBoxOne.data;
    var value2 = newSixValueBoxTwo.data;
    if (value1.input_value.length != 6) {
      this.setData(
        { _num: 2, popErrorMsg: "支付密码至少为6位" },
      );
      setTimeout(() => {
        this.setData(
          { _num: 1, },
        );
      }, 1500);

      return false
    }
    if (value1.input_value != value2.input_value) {
      this.setData(
        { _num: 2, popErrorMsg: "两次输入密码不一致" },
      );
      setTimeout(() => {
        this.setData(
          { _num: 1, },
        );
      }, 1500);

      return false
    }

    // var value = that.data.newSixValueBoxOne.data;
    // app.appRequest({
    //   url: "api/card/configinfo",
    //   success: function (res) {
    //     that.setData({
    //       info: res.data
    //     })
    //   },
    //   fail: function (res) {

    //   }
    // });
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