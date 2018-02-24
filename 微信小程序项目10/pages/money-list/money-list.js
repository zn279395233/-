// var formatTime = require("../../utils/util.js");
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

Page({
  data: {
    isScroll:true,
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
    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '加载更多……' 
  },
  onLoad: function (e) {
    this.loadMore();
// 上拉刷新与下拉加载
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString()
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
          that.setData({
            expend_sum: res.data.expend_sum,
            hasnextpage: res.data.hasnextpage,
            income_sum: res.data.income_sum,
            // rows: res.data.rows,
            page_number: that.data.page_number++
          })
        },
        fail: function (res) {

        }
      });
    }else{
      if (self.data.currentPage == self.data.allPages) {
        self.setData({
          loadMoreData: '已经到顶'
        })
        return;
      }
    }

  },
  // 下拉刷新
  refresh: function (e) {
    var self = this;
    setTimeout(function () {
      console.log('下拉刷新');
      var date = new Date();
      self.setData({
        currentPage: 1,
        refreshTime: date.toLocaleTimeString(),
        hideHeader: false
      })
      self.getData();
    }, 300);
  },
  // 显示
  showViewCalendarBtn: function () {
    this.setData({
      showModal: true,
      isScroll:false
    })
    // this.onPullDownRefresh();
    // wx.stopPullDownRefresh();
      
  },
  // 上拉刷新
  onPullDownRefresh:function(e){
      
  },
 
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
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
    this.hideModal();
  }

})  
