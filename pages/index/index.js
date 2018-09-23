// pages/select/select.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    starred: false,//开始点餐按钮是否可用
    url: 'http://106.15.95.212/index.php/Home/',
    imgUrls: [
      'http://ws.thinkliving.com.cn/catering/resource/image/banner.jpg',
      'http://ws.thinkliving.com.cn/catering/resource/image/lobster.jpg',
      'http://ws.thinkliving.com.cn/catering/resource/image/menu.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    bgstar: "#999999",
    bgtable: "red",
    windowHeight: app.globalData.equipObject.windowHeight
  },
  scanning: function () {
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        var table_id = res.result;
        wx.request({
          url: that.data.url + 'SuperCartering/getTableInfo',
          data: {
            table_id: table_id
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
          
            console.log(res.data)
            //如果桌子的状态可用
            //将桌号信息存入app.globalData中
            //设置状态位，将桌号名称显示到桌面
            var table_status = res.data.table_status;
            var table_name = res.data.table_name;
            if (table_status == "1") {
              app.globalData.tableObject = res.data;
              that.data.starred = true;
              that.setData({
                bgtable: "#999999",
                bgstar: "red",
                table_name: table_name
              })
            }
            else {
              table_status = "不可用";
              wx.showModal({
                title: '提示',
                content: '这张桌子处于' + table_status + '状态，请换桌',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }

          }
        })

      }
    })
  },
  myinfo: function () {
    wx.navigateTo({
      url: '../info/info',
    })
  },
  starmenu: function (e) {
    var that = this;
    var user_info = e.detail.userInfo;
    app.globalData.userInfo = e.detail.userInfo;
    var cInfo = {};
    var open_id = app.globalData.user.openid;
    cInfo.nickName = user_info.nickName;
    cInfo.gender = user_info.gender;
    cInfo.language = user_info.language;
    cInfo.city = user_info.city;
    cInfo.country = user_info.country;
    cInfo.avatarUrl = user_info.avatarUrl;
    cInfo.open_id = open_id;
    var url = "http://106.15.95.212/index.php/Home/SuperCartering/edit_user";
    //存储用户信息到表
    wx.request({
      url: url,
      data: cInfo,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        app.globalData.userObject = res;
     
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now() + " 用户存储成功！")

        wx.setStorageSync('logs', logs)
        if (that.data.starred) {
          wx.navigateTo({
            url: '../menu/menu',
          })
        }
      },
      fail: function (res) {
        console.info("error:" + res);
      }

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})