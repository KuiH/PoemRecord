const globalData = require('../../global.js');

Page({
  data: {
    poets: [], // 用于存储诗人名称
    dynastyName: '' // 用于存储朝代名称
  },

  onLoad(options) {
    const dynastyName = options.dynasty;
    const poets = Object.keys(globalData.poems[dynastyName]);
    this.setData({
      poets: poets,
      dynastyName: dynastyName
    });
  },

  onShow(){
    const poets = Object.keys(globalData.poems[this.data.dynastyName]);
    this.setData({
      poets: poets
    });
  },

  onPoetTap(event) {
    const poet = event.detail.content;
    wx.navigateTo({
      url: `/pages/poems/poems?dynasty=${this.data.dynastyName}&poet=${poet}`
    });
  }
});