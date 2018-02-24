var app = getApp();
var app = getApp();
Page({
  data:{
    content:null,
    info:null,
    logoUrl:null
  },
  onLoad:function(){
    var that = this;
    app.appRequest({
        url: "api/card/configinfo",
        success: function (res) {
          that.setData({
            info:res.data
          })    
        },
        fail: function (res) {

        }
      });
  },
    bindViewSweep: function () {
        var that = this;
        // 扫码功能
        wx.scanCode({
            success: function (json) {
               var content = json.result;
               wx.navigateTo({
                 url: '../scan-pay/scan-pay?content=' + content,
               });
            },
            fail: function (json) {

            }
        })
    },
    // 付款码
    bindViewCode: function () {
        wx.navigateTo({
            url: '../code-pay/code-pay',
        })
    },
    // 充值
    bindViewPay: function () {
      wx.navigateTo({
        url: '../charge-money/charge-money',
      })
    },
    // 提现
    bindViewWithdraw:function(){
      wx.navigateTo({
        url: '../withdraw-deposit/withdraw-deposit',
      })
    },
    // 关于我
    bindViewUs: function () {
        wx.navigateTo({
            url: '../about-us/about-us',
        })
    },
    // 查看明细
    bindViewPayList: function () {
        wx.navigateTo({
            url: '../money-list/money-list',
        })
    },
  
})