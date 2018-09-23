// pages/menu_six/menu_six.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://106.15.95.212/index.php/Home/',
    startPosition: { "X": 0, "Y": 0 },//动画起始的位置
    endPosition: {},//动画的结束位置
    productList: [],//货品列表
    shoppingcartObject: { "cartObject": [], "product_num": 0, "total_price": 0.0, "bottonStatus": "none", "windowHeight": app.globalData.equipObject.windowHeight },//购物车对象
    windowHeight: "",//页面可用高度
    productTypeList: [],//购物车分类列表
    productTypeName: "",//购物车分类名称，锚点链接用到
    productItem: {},//当前点击的货品货品所有信息
    cover: "none",//详情页面状态
    tableObject: "", //桌子对象
    addAnimationLeft: "-50",//点击加号动画的左边距
    addAnimationTop: "0",//点击加号动画的上边距
    addAnimationStatus: "true",//动画是否完成，
    imgUrls: [
      'http://ws.thinkliving.com.cn/catering/resource/image/banner.jpg',
      'http://ws.thinkliving.com.cn/catering/resource/image/lobster.jpg',
      'http://ws.thinkliving.com.cn/catering/resource/image/menu.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    detailHeight: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.userInfo)
    this.data.endPosition = util.getEndPosition();
    that.data.productTypeList = [];
    wx.request({
      url: that.data.url +'SuperCartering/getProductList', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        var productTypeList = that.data.productTypeList;
        var productTypeItem = "a0";
        var j = 0;
        var productTypeListItem0 = {};//货品类型json
        productTypeListItem0.type_name = res.data[0].type_name;
        productTypeListItem0.displayState = false;
        productTypeList[productTypeList.length] = productTypeListItem0;
        for (var i = 0; i < res.data.length; i++) {
         // debugger;
          if (res.data[i].type_name != productTypeList[productTypeList.length - 1].type_name) {
            j++;
            var productTypeListItemi = {};//货品类型json
            productTypeListItemi.type_name = res.data[i].type_name;
            productTypeListItemi.displayState = false;
            productTypeList[productTypeList.length] = productTypeListItemi;
         
            productTypeItem = "a" + j;
          }
          res.data[i].productListItem = i;
          res.data[i].productTypeName = productTypeItem;
          res.data[i].current_product_num = 0;//
          res.data[i].cutAndNumImage = "none";
          if (res.data[i].product_comment.length >= 50)
            res.data[i].product_comment = res.data[i].product_comment.substring(0, 50);

        }
        app.globalData.productObject = res.data;
        that.data.productTypeList = productTypeList;
        that.data.productList = res.data;
        that.data.shoppingcartObject.windowHeight = app.globalData.equipObject.windowHeight;
        that.setData({
          windowHeight: app.globalData.equipObject.windowHeight * 0.87,//
          productList: res.data,
          productTypeList: productTypeList,
          tableObject: app.globalData.tableObject,
          shoppingcartObject: that.data.shoppingcartObject,
          detailHeight: app.globalData.equipObject.windowHeight
        })

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
    this.onLoad();
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
  /*点击减号 */
  imageCut: function (event) {
    var that = this;
    var productListItem = event.currentTarget.dataset.productlistitem;//所点击物品在productList的序号
    var cartListItem = event.currentTarget.dataset.cartlistitem;//所点击物品在cartList的序号
    var productList = this.data.productList;
    var shoppingcartObject = this.data.shoppingcartObject;

    // console.log("菜品列表序号 = " + productListItem)
    // console.log("购物车序号" + cartListItem)
    //如果点击的货品数量大于0；说明该货品存在购物车中
    if (productList[productListItem].current_product_num > 0) {
      //改变菜品显示数量
      productList[productListItem].current_product_num--;
      //改变当前选择菜品总数量
      shoppingcartObject.product_num--;
      //改变当前选择菜品总价
      shoppingcartObject.total_price -= parseFloat(productList[productListItem].product_price);
      //更新购物车点击的该物品的属性
      shoppingcartObject.cartObject[cartListItem].current_product_num = productList[productListItem].current_product_num;
      //如果更新后的数目等于0,更改显示状态并将物品从购物车删除
      if (shoppingcartObject.cartObject[cartListItem].current_product_num == 0) {
        //隐藏数目和减号
        productList[productListItem].cutAndNumImage = "none";
        //删除该物品
        shoppingcartObject.cartObject.splice(cartListItem, 1);
        //将改物品从购物车删除之后，将产品列表中在购物车该物品之后的物品在购物车中的序号更新
        for (var i = cartListItem; i < shoppingcartObject.cartObject.length; i++) {
          productList[shoppingcartObject.cartObject[i].productListItem].cartListItem--;
        }
        //删除之后，如果购物车为空，更改购物车位置,隐藏购物车
        if (shoppingcartObject.cartObject.length == 0) {
          shoppingcartObject.bottonStatus = "none";
        }
      }
    }
    this.setData({
      productList: this.data.productList,
      shoppingcartObject: this.data.shoppingcartObject
    })
  },
  /*点击加号 */
  imageAdd: function (event) {
    var that = this;
    if (this.data.addAnimationStatus) {
      this.data.startPosition.X = event.detail.x;//点击该物品X坐标
      this.data.startPosition.Y = event.detail.y;//点击该物品坐标
      this.Animation(this.data.startPosition, this.data.endPosition);//调用动画
      var cartListItem = event.currentTarget.dataset.cartlistitem;//所点击物品在cartList的序号
      var productListItem = event.currentTarget.dataset.productlistitem;//所点击物品在productList的序号
      var productList = this.data.productList;//引用data对象中的货品列表对象
      var shoppingcartObject = this.data.shoppingcartObject;//引用data对象中的购物车对象
      var status = event.currentTarget.dataset.status
      productList[productListItem].current_product_num++;//改变菜品显示数量
      if (productList[productListItem].current_product_num == 1)
        productList[productListItem].cutAndNumImage = "inline";//改变菜品显示状态
      shoppingcartObject.product_num++;//改变当前选择菜品总数量
      shoppingcartObject.total_price += parseFloat(productList[productListItem].product_price);//改变当前选择菜品总价
      //如果菜的数目为1，说明这个物品在购物车中不存在，将这个物品加入购物车
      if (productList[productListItem].current_product_num == 1) {
        //在货品列表中加入该货品在购物车中序号字段cartListItem
        productList[productListItem].cartListItem = shoppingcartObject.cartObject.length;
        //将改物品加入购物车
        shoppingcartObject.cartObject[shoppingcartObject.cartObject.length] = productList[productListItem];
        //设置购物车中该物品在货品列表中的序号
        shoppingcartObject.cartObject[shoppingcartObject.cartObject.length - 1].productListItem = productListItem;
      }
      //如果存在，去购物车更新当前点击的货品数目信息
      else {
        console.log(shoppingcartObject.cartObject[cartListItem])
        shoppingcartObject.cartObject[cartListItem].current_product_num = productList[productListItem].current_product_num;
      }
      if (status == "0")//如果点击的是购物车，购物车状态位显示
        shoppingcartObject.bottonStatus = "block";
      this.setData({
        productList: productList,
        shoppingcartObject: shoppingcartObject,
        productItem: productList[productListItem]
      })
    }
  },


  //点击购物车图标
  clickCart: function (event) {
    this.data.startPosition.X = event.detail.x;//点击该物品X坐标
    this.data.startPosition.Y = event.detail.y;//点击该物品坐标
    console.log(this.data.startPosition);
    var shoppingcartObject = this.data.shoppingcartObject;
    var cover = this.data.cover;

    if (shoppingcartObject.cartObject.length != 0
      && shoppingcartObject.bottonStatus == "none" && cover == "none"
    ) {
      shoppingcartObject.bottonStatus = "block";
    }
    else {
      shoppingcartObject.bottonStatus = "none";
    }
    this.setData({
      shoppingcartObject: shoppingcartObject
    })
  },
  //点击购物车上方空白
  clickCartblank: function () {
    this.data.shoppingcartObject.bottonStatus = "none";
    this.setData({
      shoppingcartObject: this.data.shoppingcartObject
    })

  },
  //清空购物车
  emptyShoppingcart: function () {
    var productList = this.data.productList;
    var shoppingcartObject = this.data.shoppingcartObject;
    shoppingcartObject.bottonStatus = "none";
    shoppingcartObject.product_num = 0;
    shoppingcartObject.total_price = 0.0;
    shoppingcartObject.cartObject = [];
    productList = app.globalData.productObject;
    this.setData({
      productList: productList,
      shoppingcartObject: shoppingcartObject
    })
  },
  /* 点击类型 */
  clickProductType: function (event) {
    var productTypeId = event.currentTarget.dataset.producttypeid;
    for (var i = 0; i < this.data.productTypeList.length; i++) {
      if (i == productTypeId) {
        this.data.productTypeList[i].displayState = true;
      }
      else{
      this.data.productTypeList[i].displayState = false;
      }
    }
    this.setData({
      productTypeName: "a"+productTypeId,
      productTypeList: this.data.productTypeList
    })
  },
  //点击支付
  clickPaymentButton: function () {
    var that = this;
    if (this.data.shoppingcartObject.cartObject.length > 0) {
      wx.request({
        url: that.data.url + 'SuperCartering/save_order',
        data: {
          user_id: app.globalData.user.openid,
          order_price: that.data.shoppingcartObject.total_price
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {

        }
      })
      app.globalData.shoppingcartObject = this.data.shoppingcartObject;
      wx.navigateTo({
        url: '../payment/payment',
      })
    }

  },
  //点击收起购物车
  //点击商品图片，跳入商品详情页面
  jumpProductInfo: function (event) {
    var productListItem = event.currentTarget.dataset.productlistitem;
    console.log(this.data.productList[productListItem])
    if (this.data.cover == "none") {
      this.data.cover = "block";
      this.setData({
        cover: "block",
        productItem: this.data.productList[productListItem]
      })
    }

  },
  //关闭菜品详情按钮 
  closedetail: function () {
    if (this.data.cover == "block") {
      this.data.cover = "none";
      this.setData({
        cover: "none"
      })
    }
  },
  Animation: function (startPosition, endPosition) {
    var that = this;
    that.data.addAnimationStatus = false;
    that.setData({
      addAnimationLeft: startPosition.X,
      addAnimationTop: startPosition.Y,
    })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "ease",
    })
    animation.scale(2).step();
    this.setData({
      addAnimationData: animation.export()
    })
    setTimeout(function () {
      animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease",
      })
      animation.translate(endPosition.X - startPosition.X, endPosition.Y - startPosition.Y).step();
      that.setData({
        addAnimationData: animation.export(),
      })
      setTimeout(function () {
        animation = wx.createAnimation({
          duration: 1,
          timingFunction: "ease",
        })
        animation.translate(0).scale(0.1).step();
        that.data.addAnimationStatus = true;
        that.setData({
          addAnimationData: animation.export(),
        })

      }, 600)
    }, 100);


  },
  ssssssssssss: function (event) {
    this.data.startPosition.X = event.detail.x;//点击该物品X坐标
    this.data.startPosition.Y = event.detail.y;//点击该物品坐标
    console.log(this.data.startPosition);

  }
})