const globalData = require('../../global.js');

Page({
  data: {
    dynasties: [] // 用于存储朝代名称
  },

  onLoad() {
    // 从全局数据中提取朝代名称
    const dynasties = Object.keys(globalData.poems);
    this.setData({
      dynasties: dynasties
    });
  },

  onDynastyTap(event) {
    const targetDynasty = event.detail.content;
    wx.navigateTo({
      url: `/pages/poets/poets?dynasty=${targetDynasty}`
    });
  }
});