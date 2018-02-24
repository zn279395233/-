
var app = getApp();
Page({
    data: {
        info: {},
        userInfo: {}
    },
    userNameInput: function (e) {
        return e.detail.value
    },
    onLoad: function () {
      var that = this;
      app.appRequest({
        url: "api/member/info",
        success: function (res) {
          that.setData({
            info: res.data,
            userInfo: app.globalData.userInfo
          })
        },
        fail: function (res) {

        }
      });
    },
    // 修改姓名
    gotoChangePersonalName:function(options){
        var that = this;
        var personalValue = that.data.info.member_name || "";
        wx.navigateTo({
          url: '../change-personal/change-personal?personalKey=member_name&personalValue=' + personalValue,
        })
    },
    // 修改手机号码
    gotoChangePersonalMobile: function () {
      var that = this;
      var personalValue = that.data.info.mobile || "";
      wx.navigateTo({
        url: '../change-personal/change-personal?personalKey=mobile&personalValue=' + personalValue,
      })
    },
    // 修改身份证号
    gotoChangePersonalId: function () {
      var that = this;
      var personalValue = that.data.info.idValue || "";
      wx.navigateTo({
        url: '../change-personal/change-personal?personalKey=ID_CARD&personalValue=' + personalValue,
      })
    },
    // 修改我的地址
    gotoChangePersonalLocation: function () {
      var that = this;
      var personalValue = that.data.info.userLocationValue || "";
      wx.navigateTo({
        url: '../change-personal/change-personal?personalKey=ADDRESS&personalValue=' + personalValue,
      })
    },
    onShow:function(){
      
    }
});

