
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: app.globalData.productObject,//货品列表
    shoppingcartObject: { "cartObject": [], "product_num": 0, "total_price": 0.0, "bottonDistance": "-500" },
    productItem: "",
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (e) {
    console.log(e)
    var item = e.productListItem;
    this.data.productList = app.globalData.productObject,//货品列表
    this.data.productItem = app.globalData.productObject[item];
    this.data.productItem.productListItem = item
    this.data.productList[item] = this.data.productItem;
    this.setData({
      productItem: this.data.productItem
    })
  },
  //添加购物车按钮
  addcart: function (event){
//    debugger;
    var cartListItem = event.currentTarget.dataset.cartlistitem;//所点击物品在cartList的序号
    var productListItem = event.currentTarget.dataset.productlistitem;//所点击物品在productList的序号
    var productList = this.data.productList;
    var shoppingcartObject = this.data.shoppingcartObject;
    
    console.log("productListItem = " + productListItem);
    console.log(productList);
    productList[productListItem].current_product_num = parseFloat(productList[productListItem].current_product_num)+1;//改变菜品显示数量
    console.log(productListItem)
    if (productList[productListItem].current_product_num == 1)
      productList[productListItem].cutAndNumImage = "inline";//改变菜品显示状态
    shoppingcartObject.product_num++;//改变当前选择菜品总数量
    shoppingcartObject.total_price += parseFloat(productList[productListItem].price);//改变当前选择菜品总价
    //如果菜的数目为1，说明这个物品在购物车中不存在，将这个物品加入购物车
    if (productList[productListItem].current_product_num == 1) {
      productList[productListItem].cartListItem = shoppingcartObject.cartObject.length;
      shoppingcartObject.cartObject[shoppingcartObject.cartObject.length] = productList[productListItem];
      shoppingcartObject.cartObject[shoppingcartObject.cartObject.length - 1].productListItem = productListItem;
    }
    //如果存在，去购物车更新当前点击的货品信息
    else {
      shoppingcartObject.cartObject[cartListItem].current_product_num = productList[productListItem].current_product_num;
    }
    this.setData({
      productList: productList,
      shoppingcartObject: shoppingcartObject
    })
   //显示消息提示框
    wx.showToast({
      title: '添加购物车成功',
      icon: 'succes',
      duration: 1500,
      mask: true
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
  
})