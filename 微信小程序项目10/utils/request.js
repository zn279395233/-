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
    var company_code = json.company_code;
    // 请求数据
    var url = options.url;
    var data = options.data || {};
    var isAnimate = options.isAnimate || true;
    data.company_code = company_code;
    var message = options.message || "加载中...";
    var success = options.success || function () {
            // wx.showToast({
            //   title: '成功',
            //   icon: 'success',
            //   duration: 2000
            // })
        };
    var fail = options.fail || function () {
            alert("请求失败")
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
            // if (res.statusCode == 200 && res.return_code == "SUCCESS") {
            if (res.statusCode == 200) {
                success(res.data)
            } else {
                fail()
            }
        },
        fail: function (res) {
            // wx.hideNavigationBarLoading()
            if (message != "" && isAnimate) {
                wx.hideLoading()
            }
            fail()
        },
        complete: function (res) {

        },
    })
}
module.exports = {
    requestLoading: requestLoading
}