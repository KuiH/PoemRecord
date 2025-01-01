const globalData = require('../../global.js');

Page({
  data: {
    poetName: '',
    dynastyName: '',
    poems: []
  },

  onLoad(options) {
    const dynasty = options.dynasty;
    const poet = options.poet;
    this.setData({
      dynastyName: dynasty,
      poetName: poet
    });
    this.fetchPoems(dynasty, poet);
  },

  fetchPoems(dynastyName, poet) {
    const poems = globalData.poems[dynastyName][poet];
    this.setData({
      poems: poems
    });
  },

  onPoemTap(event) {
    // 获取点击的古诗数据
    const { dynasty, poet, content, title, isPoem } = event.detail;
    
    // 跳转到 recite 页面，并通过 EventChannel 传递数据
    wx.navigateTo({
      url: '/pages/recite/recite',
      success: (res) => {
        res.eventChannel.emit('sendPoemData', {
          dynasty: dynasty,
          poet: poet,
          content: content,
          title: title,
          isPoem: isPoem
        });
      }
    });

  }
});