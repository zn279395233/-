
var formatTime = require('../../utils/util.js');
var app = getApp();
const date = new Date()
const years = []
const months = []
const days = []
const daysX = []
const daysD = []
const daysP = []
const daysR = []
var mDay
for (let i = 1900; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (let i = 1; i <= 30; i++) {
  daysX.push(i)
}
for (let i = 1; i <= 31; i++) {
  daysD.push(i)
}
for (let i = 1; i <= 28; i++) {
  daysP.push(i)
}
for (let i = 1; i <= 29; i++) {
  daysR.push(i)
}
// 下拉坐标
var pageY = 0;
Page({
  data: {
    isScroll:true,
    deal_date: "2018-02",//请求时间
    page_number: 1,//开始页数,
    page_size: 10,//每页显示多少条数据(默认10条)
    expend_sum: null,//支出汇总
    hasnextpage: true,//是否还有下一页
    income_sum: null,//收入汇总
    rows: {},//明细列表{amount:金额, deal_time:时间, icon:图标, id:明细id,title内容}
    total: null,//总行数
    // scrollTop: 100,
    // hasMore: true,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 1,
    days: days,
    day: 1,
    year: date.getFullYear(),
    value: [9999, 0, 0],
    // 上拉刷新与下拉加载
    showModal: false,
    hideHeader: true,
    hideBottom: true,
    contentlist: [], // 列表显示的数据源
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '加载更多……',
    isRefreshHidden:false//下拉刷新动画
  },
  onLoad: function (e) {
// 上拉刷新与下拉加载
    var that = this;
    var date = new Date();
    that.setData({
      deal_date: that.getDate(date)
    })
    this.loadMore();
  },
  // 时间改变
  bindChange: function (e) {
    const val = e.detail.value
    var mdays
    let year = this.data.years[val[0]]
    let month = this.data.months[val[1]]
    let day = this.data.days[val[2]]
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
      mdays = daysR
    } else {
      mdays = daysP
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
      mdays = daysX
    } else if (month == 1 || month == 3 || month == 5 || month == 7 | month == 8 | month == 10 | month == 12) {
      mdays = daysD
    }
    this.setData({
      year,
      month,
      day,
      days: mdays
    })
  },
  
  //事件处理函数
  bindViewTap: function (options) {
      var orderNumber = options.currentTarget.dataset.ordernumber;
      wx.navigateTo({
          url: '../money-detail/money-detail?orderNumber=' + orderNumber
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
          setTimeout(function () {
            that.setData({
              expend_sum: res.data.expend_sum,
              hasnextpage: res.data.hasnextpage,
              income_sum: res.data.income_sum,
              rows: res.data.rows,
              page_number: that.data.page_number++,
              isRefreshHidden: false
            })
          }, 1500)
        },
        fail: function (res) {

        }
      });
    }else{
      if (that.data.currentPage == that.data.allPages) {
        that.setData({
          loadMoreData: '已经到顶'
        })
        return;
      }
    }
  },
  // 显示
  showViewCalendarBtn: function () {
    this.setData({
      showModal: true,
      isScroll:false
    })   
  },
  getDate: function (date){
      var that =this; 
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return [year, month].map(that.formatNumber).join('-');
  },
  formatNumber:function(n){
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
  * 对话框确认按钮点击事件
  */
  onConfirm: function () {
    var that =this;
    var year = that.data.year;
    var month = that.data.month;
    that.setData({
      deal_date: [year, month].map(that.formatNumber).join('-')
    })
    that.hideModal();
    that.loadMore();
  },
  //滑动开始
  touchStart:function(e){
    pageY = e.changedTouches[0].pageY;
  },
  //滑动进行中
  touchMove: function () {
    var that = this;
  },
  //滑动结束
  touchEnd: function (e) {
    // var that = this;
    // var curPageY = e.changedTouches[0].pageY;
    // if (curPageY - pageY > 0){//下拉刷新
    //   var date = new Date();
    //   that.setData({//上拉刷新还原
    //     page_number: 0,
    //     hasnextpage:true,
    //     isRefreshHidden: true,
    //     deal_date: that.getDate(date)
    //   })
    //   that.loadMore();
    // } else if (curPageY - pageY < 0){
    //   that.setData({
    //     isRefreshHidden: true
    //   })
    //   that.loadMore();
    // }
  },
})  
