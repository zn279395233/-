var wxbarcode = require('../../utils/codepay.js');
var app = getApp();
Page({
  data: {
    isHidden: false,
    codePayCode: false,
    codePayIntroduces: false,
  auth_codes: ["185431449958186261","188187864775467712","182151627242837173","184585691467337197","186726288263654216","188145895687179876","181271393546332663","184412475884611921","187827214627554261","185182389487331185"],//一个批次的条形码数组
    batch: null,//这个数组的批次
    index: 0,
    timer: null, //计时器,
    timerPay: null,
    codePayCodeData: {},//条形码数据
    twoCodePayCodeData: {},//二维码码数据
    // 扫码结果显示
    amount: null,//支付金额
    receiver: null,//收款方名称
    receiver_image: null,//收款方头像
    remark: null//付款方备注,


  },
  onLoad: function (options) {
    var that = this;
    that.createQrAndBarCode();
    var timer = setInterval(function () {
      that.createQrAndBarCode();
    }, 60000)
    that.data.timer = timer;
     
  },
  // 请求后台看是否扫码成功
  isPayCode: function () {
    var that = this;
    var timerPay = setInterval(function () {
      app.appRequest({
        url: "api/micropayresult",
        isAnimate: false,
        data: {
          batch: that.data.batch
        },
        success: function (res) {
          if (res.data.success) {
            clearInterval(timerPay);
            that.setData({
              amount: res.data.amount,//支付金额
              receiver: res.data.receiver,//收款方名称
              receiver_image: res.data.receiver_image,//收款方头像
              remark: res.data.remark//付款方备注
            });
          }
        },
        fail: function (res) {

        }
      });
    }, 2000)
    that.data.timerPay = timerPay;
  },

  // 根据后台的数据生成条形码和二维码
  createQrAndBarCode: function () {
    var that = this;
    if (that.data.index <= 9 && that.data.index >= 0) {
      var array = that.data.auth_codes, index = that.data.index;
      wxbarcode.barcode('barcode', array[index], 591.7, 165.625);
      wxbarcode.barcode('barcodes', array[index], 591.7, 165.625);
      wxbarcode.qrcode('qrcode', array[index], 250, 250);
      that.data.index++;
    } else {
      clearInterval(that.data.timer);
    }
    
  },
  bindView: function () {

  },

  // <!--谨防诈骗提示  -->
  showViewCodeIntro: function () {
    this.setData({
      codePayCode: true,
      codePayIntroduces: false,
      isHidden: true
    })
  },
  //条形码
  showViewCode: function () {
    this.setData({
      codePayIntroduces: true,
      codePayCode: false,
      isHidden: true
    });
    // if (that.data.index <= 9 && that.data.index >= 0) {
    //   var array = that.data.auth_codes, index = that.data.index;
    //   wxbarcode.barcode('barcode', array[index], 591.7, 165.625);
    // } else {
    //   clearInterval(that.data.timer);
    // }
  },
  // hi
  hideViewCode: function () {
    this.setData({
      codePayIntroduces: false,
      codePayCode: false,
      isHidden: false
    })
  },
  // 根据数字一组数据生成条形码
  createBarCode: function (auth_codes) {

  },

  // 根据数字一组数据生成二维码
  createQrCode: function (auth_codes) {

  },
  onHide: function () {
    var that = this;
    clearInterval(that.data.timer);//消除二维码和条码计时
    clearInterval(that.data.timerPay);//消除按批次请求后台是否支付
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    clearInterval(that.data.timer);//消除二维码和条码计时
    clearInterval(that.data.timerPay);//消除按批次请求后台是否支付
  },
})
