// pages/select/select.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userHistoryInfoList: [
      { "id": "1", "user_id": "1", "history_info": "少葱" },
      { "id": "2", "user_id": "1", "history_info": "多辣" },
      { "id": "3", "user_id": "1", "history_info": "少油" },
      { "id": "4", "user_id": "1", "history_info": "少盐" }
    ],
    userInputRemarks: "",
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // 从数据库中用户历史信息
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
        user_id: app.globalData.userObject.openid,
        repastnum: app.globalData.repastnum
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        res.data = that.data.userHistoryInfoList;
        that.setData({
          userHistoryInfoList: res.data,
        })
        // console.log(res.data)
      }
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
  onLoad: function (option) {
    console.log(option.query)
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

  },
  userHistoryInfoButton: function (e) {
    var that = this;
    //用户点击的备注是备注列表中的第几个
    var index = e.currentTarget.dataset.index;
    if (this.data.userInputRemarks.length == 0)
      this.data.userInputRemarks += this.data.userHistoryInfoList[index].history_info;
    else
      this.data.userInputRemarks += ("," + this.data.userHistoryInfoList[index].history_info);
    this.setData({
      userInputRemarks: this.data.userInputRemarks
    })

  },





  submit: function () {
    var that = this;

    var item = [];

    setTimeout(function () {
      wx.showToast({
        title: '已添加',
        icon: 'sucess',
        duration: 1000
      })

      app.globalData.userInputRemarks = that.data.userInputRemarks;
      wx.redirectTo({
        url: '../payment/payment?id=1'
      })

    },10)
 

  },
  remarksInput: function (event) {
    this.data.userInputRemarks = event.detail.value;
    this.setData({
      userInputRemarks: this.data.userInputRemarks
    })
   // console.log(event.detail.value)
  }

})