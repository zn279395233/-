var newWork = require('utils/request.js');

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据  
    // var logs = wx.getStorageSync('logs') || []  
    // logs.unshift(Date.now())  
    // wx.setStorageSync('logs', logs)  
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.token) {
      typeof cb == "function" && cb(that.globalData);   
    } else {
      //调用登录接口  
      wx.login({
        success: function (res) {
          that.globalData.code = res.code;
          that.getSeachOption()//获取企业的company_code
          wx.getUserInfo({
            success: function (res) { 
              // that.globalData.userInfo = res.userInfo;
              that.globalData.options = res;
              // typeof cb == "function" && cb(that.globalData.userInfo)
              wx.request({
                url: that.globalData.baseUrl + 'api/wechatlogin',
                method: "POST",//get为默认方法/POST
                data: {
                  code: that.globalData.code,
                  company_code: that.globalData.company_code,
                  encryptedData: that.globalData.options.encryptedData,
                  iv: that.globalData.options.iv
                },
                success: function (res) {
                  if (res.statusCode == "200" && res.data.data){
                    that.globalData.token = res.data.data;
                    typeof cb == "function" && cb(that.globalData);
                  }
                },
                fail: function (res) {
                
                }
              })
            }
          });
        }
      });
    }
  },
  appRequest:function(options){
    var that = this;
    that.getUserInfo(function (json) {
      newWork.requestLoading(options,json)
    });
  },
  showok: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  modalcnt: function (options) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },  
  globalData: {
    userInfo: null,
    company_code:null,
    code:null,
    options:null,
    appId:"wx53a451564e9aebed",
    appSecret:"b773c2e821e8d8da8406982bc041e759",
    token:null,
    encryptedData:null,
    iv:null,
    post:null,
    baseUrl:"http://192.168.100.244:8200/"
  },
  getSeachOption:function(){
    var that = this;
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options;
    that.globalData.company_code = options.company_code
  }
})  