// var formatTime = require("../../utils/util.js");
// var app = getApp();
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
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 1,
    days: days,
    day: 1,
    year: date.getFullYear(),
    value: [9999, 0, 0],
    showModal: false
  },
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
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  /**
 * 弹窗
 */

  showViewCalendarBtn: function () {
    this.setData({
      showModal: true
    }),
      this.onPullDownRefresh()
      
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
