// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(options, json) {
  // 登录数据
  var baseUrl = json.baseUrl;
  var token = json.token;
  //var company_code = json.company_code;
  // 请求数据
  var url = options.url;
   
  var data = options.data || {};
  var isAnimate = typeof options.isAnimate == "undefined" ? true : false;
  //data.company_code = company_code;
  var message = options.message || "加载中...";
  var success = options.success || function () {
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
  };
  var fail = options.fail || function () {
    wx.showToast({
      title: '请求失败'
    })
  };
  // wx.showNavigationBarLoading()
  if (message != "" && isAnimate) {
    wx.showLoading({
      title: message
    })
  }
  wx.request({
    url: baseUrl + url,
    data: data,
    header: {
      token: token
    },
    method: 'POST',
    success: function (res) {
      // wx.hideNavigationBarLoading()
      if (message != "" && isAnimate) {
        wx.hideLoading()
      }
      if (res.statusCode == 200 && res.data.return_code == "SUCCESS") {
      
        success(res.data)
      } else {
        fail(res.data)
      }
    },
    fail: function (res) {
      // wx.hideNavigationBarLoading()
      if (message != "" && isAnimate) {
        wx.hideLoading()
      }
      fail(res)
    },
    complete: function (res) {

    },
  })
}
module.exports = {
  requestLoading: requestLoading
}