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
  },

  onAddTap() {
    console.log('添加按钮被点击');
  },

  // 选择文件
  _chooseFile() {
    return new Promise((resolve, reject) => {
      wx.chooseMessageFile({
        count: 1, // 每次只能选择一个文件
        type: 'file',
        success: resolve,
        fail: reject
      });
    });
  },

  // 读取文件
  _readFile(filePath) {
    return new Promise((resolve, reject) => {
      const fs = wx.getFileSystemManager();
      fs.readFile({
        filePath: filePath,
        encoding: 'utf8',
        success: (res) => resolve(res.data),
        fail: reject
      });
    });
  },

  async onImportTap() {
    try {
      // 让用户选择文件
      const fileRes = await this._chooseFile();
      const tempFilePath = fileRes.tempFiles[0].path; // 获取用户选择的文件路径

      const fileContent = await this._readFile(tempFilePath);
      const importedPoems = JSON.parse(fileContent); // 解析文件内容
      globalData.poems = importedPoems;

      wx.showToast({
        title: '导入成功',
        duration: 1500
      });
      this.setData({
        dynasties: Object.keys(importedPoems) // 更新页面中的朝代列表
      });
    } catch (error) {
      wx.showToast({
        title: error.message || '导入失败',
        icon: 'none',
        duration: 1500
      });
    }
  },


  onExportTap() {
    const fs = wx.getFileSystemManager();
    const filePath = globalData.defaultPoemsPath;
    const dataStr = JSON.stringify(globalData.poems, null, 2); // 将全局诗词数据转换为 JSON 字符串

    fs.writeFile({
      filePath: filePath,
      data: dataStr,
      encoding: 'utf8',
      success: (res) => {
        // 提示保存成功
        wx.showToast({
          title: '保存成功',
          duration: 1500
        });
      },
      fail: (err) => {
        wx.showToast({
          title: '保存失败',
          duration: 1500
        });
      }
    });
  }
});