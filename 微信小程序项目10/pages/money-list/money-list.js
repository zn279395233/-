Page({
    data: {
        hasMore: true,
        order: [{
            src: "",
            merchantName: "良品铺子",
            date: "2018-01-24 10：22",
            money: 300
        }, {
            src: "",
            merchantName: "良品铺子1",
            date: "2018-01-24 10：22",
            money: -300
        }]
    },
    //事件处理函数  
    bindViewTap: function () {
        wx.navigateTo({
            url: '../money-detail/money-detail'
        })
    },
    onLaunch: function (e) {

        var that = this;
        var url = '';
        wx.request({
            url: '',
            data: "",
            method: 'POST',  //必须大写哦
            success: function (json) {
                that.setData({
                    list: that.data.order.concat(json.data.result.list),
                });
            },
            fail: function (json) {
                alert(json.desc)
            },
            complete: function (json) {
                wx.hideToast();
                alert(json.desc)
            }
        });

    },
    logbtn: function () {
        wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 1200
        })
    },
    loadMore: function (e) {
        var that = this;
        wx.showToast({
            title: '加载中。。。',
            icon: 'loading'
        });
        if (that.data.hasMore) {
            wx.request({
                url: '',
                data: "",
                method: 'POST',  //必须大写哦
                success: function (json) {
                    that.setData({
                        list: that.data.order.concat(json.data.result.list)
                    });
                },
                fail: function (json) {
                    alert(json.desc);
                },
                complete: function (json) {
                    wx.hideToast();
                    alert(json.desc);
                }
            });
        }

    }

})