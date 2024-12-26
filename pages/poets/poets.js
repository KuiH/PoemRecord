const globalData = require('../../global.js');

Page({
  data: {
    poets: [], // 用于存储诗人名称
    dynastyName: '' // 用于存储朝代名称
  },

  onLoad(options) {
    // 从参数中获取朝代名称
    const dynastyName = options.dynasty;
    this.setData({
      dynastyName: dynastyName
    });

    // 根据朝代名称获取诗人数据
    const poets = Object.keys(globalData.poems[dynastyName]);
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