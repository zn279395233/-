var app = getApp();
Page({
  data:{
    order:[{
       src:"",
       merchant:"良品铺子",
       date:"2018-01-24 10：22",
       money:300
    },{
      
    }]
  },
    bindViewSweep: function () {
        // 扫码功能
        wx.scanCode({
            success: function (json) {
                wx.navigateTo({
                    url: '../scan-pay/scan-pay',
                })
            },
            fail: function (json) {

            }
        })
    },
    bindViewCode: function () {
        wx.navigateTo({
            url: '../code-pay/code-pay',
        })
    },
    bindViewPay: function () {
        app.init();

    },
    bindViewUs: function () {
        wx.navigateTo({
            url: '../about-us/about-us',
        })
    },
    bindViewPayList: function () {
        wx.navigateTo({
            url: '../money-list/money-list',
        })
    },
  
})