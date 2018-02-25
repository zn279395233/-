var app = getApp();
var app = getApp();
Page({
  data:{
    content:null,
    info:null,
    logoUrl:null,
    isHasPayPassword:false//是否提醒用户设置支付密码(不显示)
  },
  onLoad:function(options){
    var that = this;
    if (options.isHasPayPassword){
      that.setData({
        isHasPayPassword:true
      })
    }
    // 验证用户是否设置支付密码
    app.appRequest({
      url: "api/member/checkpaypassword",
      success: function (res) {
          that.setData({
            isHasPayPassword: !res.hasset
          })   
      },
      fail: function (res) {

      }
    });
    
    // 获取会员卡信息
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