// app.js
const globalData = require('./global.js');

App({
  globalData: {
    poems: null // 初始化为 null
  },

  onLaunch() {
    this.globalData = globalData;
  }
});