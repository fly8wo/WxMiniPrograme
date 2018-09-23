const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function Animation(startPosition, endPosition) {
  this.animation = animation;
  setTimeout(function () {
    animation.translate(30).step()
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 1000)

  // var startX = startPosition[0];
  // var startY = startPosition[1];
  // var endX = endPosition[0];
  // var endY = endPosition[1];

  // this.finger = {}; var topPoint = {};
  // this.finger['x'] = e.touches["0"].clientX;
  // this.finger['y'] = e.touches["0"].clientY;
  // if (this.finger['y'] < this.busPos['y']) {
  //   topPoint['y'] = this.finger['y'] - 150;
  // } else {
  //   topPoint['y'] = this.busPos['y'] - 150;
  // }
  // topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;
  // this.linePos = app.bezier([this.finger, topPoint, this.busPos], 30);
  // var index = 0, that = this,
  //   bezier_points = that.linePos['bezier_points'];
  // this.setData({
  //   hide_good_box: false,
  //   bus_x: that.finger['x'],
  //   bus_y: that.finger['y']
  // })
  // this.timer = setInterval(function () {
  //   index++;
  //   that.setData({
  //     bus_x: bezier_points[index]['x'],
  //     bus_y: bezier_points[index]['y']
  //   })
  //   if (index >= 28) {
  //     clearInterval(that.timer);
  //     that.setData({
  //       hide_good_box: true,
  //       hideCount: false,
  //       count: that.data.count += 1
  //     })
  //   }
  // }, 33);
}

function getEndPosition() {
  var endPosition = { "X": 0, "Y": 0 };
  var equipObject = getApp().globalData.equipObject;
  endPosition.X = 50 / 320 * equipObject.windowWidth;
  endPosition.Y = 446 / 504 * equipObject.windowHeight;
  return endPosition;
}

module.exports = {
  formatTime: formatTime,
  Animation: Animation,
  getEndPosition: getEndPosition
}
