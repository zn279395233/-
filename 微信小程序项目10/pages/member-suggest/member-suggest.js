// pages/member-suggest/member-suggest.js
var myreg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:0,
    popErrorMsg: "",
    _num: 1,
    content:"",
    mobile:"",
    noteMaxLen: 200,
    noteNowLen: 0

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 内容计算验证
  bindTextAreaChange: function (e) {
    var value = e.detail.value, len = parseInt(value.length);
    this.setData({ noteNowLen: len, content: value })
    if (len >= 200) {
      this.setData(
        { _num: 2, popErrorMsg: "" },
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
  // 手机号
  amountInput:function(e){
    var that =this;
    that.setData({
      mobile: e.detail.value
    })
  },
  // 单选按钮选中切换
  radioChange:function (e){
    var that = this;
    that.setData({
      types:e.detail.value
    })
  },
  // 提交
  saveBtn:function (){
    if (this.data.content.length == 0) {
      this.setData(
        { _num: 2, popErrorMsg: "内容不能为空" },
      );
      setTimeout(() => {
        this.setData(
          { _num: 1, },
        );

      }, 1500);
      return false
    }
    if (this.data.mobile.length == 0) {
      this.setData(
        { _num: 2, popErrorMsg: "手机号不能为空" },
      );
      setTimeout(() => {
        this.setData(
          { _num: 1, },
        );

      }, 1500);
      return false
    }
    if (!(myreg.test(this.data.mobile))){
      this.setData(
        { _num: 2, popErrorMsg: "手机号错误" },
      );
      setTimeout(() => {
        this.setData(
          { _num: 1, },
        );

      }, 1500);
      return false
    }
    //将投诉内容提交给后台
    app.appRequest({
      url: "api/member/suggest",
      data:{
        content: that.data.content,
        mobile: that.data.mobile,
        type: that.data.types
      },
      success: function (res) {
        
      },
      fail: function (res) {

      }
    });
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