var app = getApp(); 
Page({
  data: {
    content: null,
    confiInfo: null,
    cardInfo:null,
    logoUrl: null,
    isHasPayPassword: true//是否提醒用户设置支付密码(不显示)
  },
  onLoad: function (options) {
    var that = this;
    if (options.isHasPayPassword) {
      that.setData({
        isHasPayPassword: false
      })
    }
    app.getUserInfo(function(){
      // 验证用户是否设置支付密码
      app.appRequest({
        url: "api/member/checkpaypassword",
        success: function (res) {
          that.setData({
            isHasPayPassword: res.data.hasset
          })
        },
        fail: function (res) {

        }
      });
      // 获取会员卡全局信息提取
      app.appRequest({
        url: "api/card/configinfo",
        success: function (res) {
          that.setData({
            configInfo: res.data
          })
        },
        fail: function (res) {

        }
      });
      // 获取会员卡信息
      app.appRequest({
        url: "api/card/info",
        success: function (res) {
          console.log(res)
          that.setData({
            cardInfo: res.data
          })
          wx.setStorageSync('card_code', that.data.cardInfo.card_code) 
        },
        fail: function (res) {

        }
      });
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
  bindViewWithdraw: function () {
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