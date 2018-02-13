// var formatTime = require("../../utils/util.js");
var app = getApp();
Page({
    data: {
      deal_date: "2018-02",//请求时间
      page_number: 1,//开始页数,
      page_size: 10,//每页显示多少条数据(默认10条)
      expend_sum: null,//支出汇总
      hasnextpage: true,//是否还有下一页
      income_sum: null,//收入汇总
      rows: [],//明细列表{amount:金额, deal_time:时间, icon:图标, id:明细id,title内容}
      total: null,//总行数
      // scrollTop: 100,
      // hasMore: true,
      // order: [{
      //     src: "../../images/big_03.png",
      //     merchantName: "良品铺子",
      //     date: "2018-01-24 10：22",
      //     money: 300,
      //     orderNumber: 100
      // }, {
      //     src: "../../images/big_03.png",
      //     merchantName: "良品铺子1",
      //     date: "2018-01-24 10：22",
      //     money: -300,
      //     orderNumber: 101
      // }],
      // 日历
      // currentDate: "2017年05月03日",
      // dayList: '',
      // currentDayList: '',
      // currentObj: '',
      // currentDay: '',
      // showViewCalendar:false,
      showViewCalendar: {
        state: false,
        currentDate: "2017年05月03日",
        dayList: '',
        currentDayList: '',
        currentObj: '',
        currentDay: '',
      }
    },
  onLoad: function (e) {
    this.loadMore();
    this.createCalendar();

  },
    //事件处理函数  
    bindViewTap: function (options) {
        var orderNumber = options.currentTarget.dataset.ordernumber;
        wx.navigateTo({
            url: '../money-detail/money-detail?orderNumber=' + orderNumber
        })
    },
  // 显示
  showViewCalendarBtn: function () {
    this.setData({
      showViewCalendar: {
        state: true,
      }
    })
    },
  loadMore: function (e) {
        var that = this;
    if (that.data.hasnextpage) {
      app.appRequest({
        url: "api/account/list",
        data: {
          deal_date: that.data.deal_date,
          page_number: that.data.page_number,
          page_size: that.data.page_size
            },
            success: function (res) {
              that.setData({
                expend_sum: res.data.expend_sum,
                hasnextpage: res.data.hasnextpage,
                income_sum: res.data.income_sum,
                rows: res.data.rows,
                page_number: that.data.page_number++
              })
            },
        fail: function (res) {

            }
      });
    }

    },
  // 日历
  createCalendar: function (options) {
    debugger
    var currentObj = this.getCurrentDayString();
    this.setData({
      // showViewCalendar:{
      //   currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
      //   currentDay: currentObj.getDate(),
      //   currentObj: currentObj
      // }
    });
    this.setSchedule(currentObj)
    },
  doDay: function (e) {
    debugger
    var that = this
    var currentObj = that.data.showViewCalendar.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var str = ''
    if (e.currentTarget.dataset.key == 'left') {
      m -= 1
      if (m <= 0) {
        str = (Y - 1) + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
        }
    } else {
      m += 1
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        str = (Y + 1) + '/' + 1 + '/' + d
      }
    }
    currentObj = new Date(str)
    this.setData({
      // showViewCalendar:{
      //   currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
      //   currentObj: currentObj
      // }
    })

    this.setSchedule(currentObj);
  },
  getCurrentDayString: function () {
    var objDate = this.data.showViewCalendar.currentObj;
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
      return new Date(a)
    }
  },
  setSchedule: function (currentObj) {
    var that = this
    var m = currentObj.getMonth() + 1
    var Y = currentObj.getFullYear()
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate()
    var currentDayNum = new Date(Y, m, 0).getDate()
    var currentDayWeek = currentObj.getUTCDay() + 1
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = []
    var f = 0
    for (var i = 0; i < 42; i++) {
      let data = []
      if (i < firstKey - 1) {
        currentDayList[i] = ''
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = f + 1
          f = currentDayList[i]
        } else if (f >= currentDayNum) {
          currentDayList[i] = ''
        }
      }
    }
    that.setData({
      // showViewCalendar:{
      //   currentDayList: currentDayList
      // }
    })
    }

})