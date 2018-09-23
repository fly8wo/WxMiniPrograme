// pages/select/select.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shoppingcartObject: app.globalData.shoppingcartObject,
    comment: app.globalData.comment,//备注信息
    total: '',
    repastnum: app.globalData.repastnum,//用餐人数
    nobody: "未选择",//用餐人数未选择的时候
    height: "450rpx",
    position: "",
    bottom: "",
    display_open: "",
    display_stop: "none",
    total_price: "",//总价
    product_standard: "",//数量
    product_price: "",//单价
    product_name: "",//货品
    animationData: {},
    List: true,
    item: "通知后厨",
    comment: ""//用户输入的备注信息
  },



  /**
   * 生命周期函数--监听页面加载
   *///与支付页面有关
  onLoad: function (value) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
  //  console.log("跳转的函数是")
  //  console.log(this.data.shoppingcartObject)
    var userInputRemarkss = "";
   // debugger;
    if (app.globalData.userInputRemarks == null){
      userInputRemarkss = "";
    }
    else if (app.globalData.userInputRemarks.length > 5){
      userInputRemarkss = app.globalData.userInputRemarks.substring(0, 5) + "...";
    }
    else{
      userInputRemarkss = app.globalData.userInputRemarks;
    }
    this.data.shoppingcartObject = app.globalData.shoppingcartObject;
    this.setData({
      shoppingcartObject: this.data.shoppingcartObject,
      comment: userInputRemarkss,
      repastnum: app.globalData.repastnum
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

  },
  /**
   * 用户点击未选择后
   */
  modify() {
    var itemList = ['1', '2', '3', '4', '5', '6'];
    var that = this;
    wx.showActionSheet({
      itemList: ['1', '2', '3', '4', '5', '6'],
      success: function (res) {
        app.globalData.repastnum = itemList[res.tapIndex];
          that.setData({
            repastnum: itemList[res.tapIndex]
          })
      //  console.log(res)
      },
      fail: function (res) {
      //  console.log(res.errMsg)
      }
    })
  },
  /**
   * 用户点击通知后厨所触发的事件
   */
  
  immeBuy: function () {
  //  console.log("点击备注传回来的信息是")
  //  console.log(app.globalData.item)
    var that = this;
    var List = this.data.List;
    var that = this;

    if (List) {

      wx.showModal({
        title: '提示',
        content: '您是否通知后厨做您点好的餐？',
        success: function (res) {
          that.data.List = false;
          if (res.confirm) {
          //  console.log("确定")
            wx.showToast
              ({
                title: '通知成功',
                icon: 'success',
                duration: 4000,
              })
            that.setData({
              item: "支付"
            })
            wx.showModal({
              title: '提示',
              content: '后厨已经在给你制作中，您是否立即付款',
              success: function (res) {
                if (res.confirm) {
                  //console.log('立即支付')
                  app.globalData.userInputRemarks = "";
                  wx.reLaunch({
                    url: '../menu/menu'
                  })
                } else if (res.cancel) {
                  that.data.List = false;
                  //console.log('暂不支付')
                }
              }
            })
          } else if (res.cancel) {
            that.data.List = true;
            //console.log('取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '后厨已经在给你制作中，您是否立即付款',
        success: function (res) {
          if (res.confirm) {
            app.globalData.userInputRemarks ="";
          //  console.log('立即支付')
            wx.redirectTo({
              url: '../menu/menu'
            })
          } else if (res.cancel) {
            //console.log('暂不支付')
          }
        }
      })
    }
  }
}) 
