// pages/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://ws.thinkliving.com.cn/catering/resource/image/banner.jpg',
      'http://ws.thinkliving.com.cn/catering/resource/image/lobster.jpg',
      'http://ws.thinkliving.com.cn/catering/resource/image/menu.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    menu:'',
    order:'',
    info: '',
    takeout: '',
    menuspecial: '',
    orderspecial:'',
    infospecial:'',
    takeoutspecial:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  clickmenu :function(){
    var that = this;
    setTimeout(function () {
      that.setData({
        menu: 'none',
        menuspecial: ''
      })
    },500)
    this.setData({
      menu:'block',
      menuspecial:'special'
    })
    wx.navigateTo({
      url: '../menu/menu',
    })
  },
  clickorder: function () {
    this.setData({
      order: 'block',
      orderspecial: 'special'
    })
  },
  clickinfo: function () {
    this.setData({
      info: 'block',
      infospecial: 'special'
    })
  },
  clicktakeout: function () {
    this.setData({
      takeout: 'block',
      takeoutspecial: 'special'
    })
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