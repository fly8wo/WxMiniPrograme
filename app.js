App({
  onLaunch: function () {
    var that = this;

    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          var appid = 'wx7317ea6919f1af27';
          var secret = '53f6a439369c2e3c03a07989664cb642';
          var convertUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';

          //调用request请求api转换登录凭证 
          wx.request({
            url: convertUrl,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
            // header: {}, // 设置请求的 header    
            success: function (res) {
              console.log(res)
              console.log("res")
              that.globalData.user = res.data;
              var obj = {};
              obj.openid = res.data.openid;
              console.log("openid=" + obj.openid);
              //此处得到openid
              obj.expires_in = Date.now() + res.data.expires_in;
              //console.log(obj);
              wx.setStorageSync('user', obj);//存储openid 
            },
            complete: function (res) {
              var userInfo = wx.getStorageSync("userInfo");
              var user = wx.getStorageSync("user");

              var cInfo = {};
              cInfo.nickName = userInfo.nickName
              cInfo.nickphoto = userInfo.avatarUrl;
              cInfo.gender = userInfo.gender;
              cInfo.province = userInfo.province;
              cInfo.city = userInfo.city;
              cInfo.userId = user.openid;
              // var url = "此处填写开发者服务器登录接口";
              var url = "https://ws.thinkliving.com.cn/index.php?s=/addon/TestYuanZhengXian/TestYuanZhengXian/addCustomer";
              //存储用户信息到表
              wx.request({
                url: url,
                data: cInfo,
                header: { 'Content-Type': 'application/json' },
                success: function (res) {
                  that.globalData.userObject = res;
                  console.info(res);
                  //调用API从本地缓存中获取数据
                  var logs = wx.getStorageSync('logs') || []
                  logs.unshift(Date.now() + " 用户存储成功！")

                  wx.setStorageSync('logs', logs)
                },
                fail: function (res) {
                  console.info("error:" + res);
                }

              })
            }
          });

        } else {
          console.info('获取用户登录态失败！' + res.errMsg);
        }
      }
    })
    //得到设备信息，将信息存入equipObject中
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.equipObject = res;
      }
    })
  },
  globalData: {
    equipObject: '',
    userObject: '',
    tableObject: '',
    branchObject: '',
    user: '',
    repastnum:""
  }

})