const globalData = require('../../global.js');

Page({
  data: {
    poetName: '',
    poems: []
  },

  onLoad(options) {
    const dynasty = options.dynasty;
    const poet = options.poet;
    this.setData({
      poetName: poet
    });
    this.fetchPoems(dynasty, poet);
  },

  fetchPoems(dynastyName, poet) {
    const poems = globalData.poems[dynastyName][poet];

    this.setData({
      poems: poems
    });
  }
});