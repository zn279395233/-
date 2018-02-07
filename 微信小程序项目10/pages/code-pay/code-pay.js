var numberContent = require('../../utils/md5.js');

Page({
    data: {
        image: []
    },
    onLoad: function () {

        // wx.request({
        //   url: "../../json/json.json",
        //   method: 'GET',
        //   data: {},
        //   header: {
        //     'Accept': 'application/json'
        //   },
        //   success: function (res) {
        //     debugger
        //   },
        //   complete: function (json) {

        //   }
        // })
    },
    bindView: function () {
        var password = numberContent.md5(102145678);
    }
})
