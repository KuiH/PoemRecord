const globalData = require('../../global.js');
const { savePoem } = require('../../utils/util');

Page({
  data: {
    poetName: '',
    dynastyName: '',
    poems: [],
    offset: 0,
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
  },

  // // 编辑按钮点击事件
  // onEditTap(event) {
  //   const index = event.currentTarget.dataset.index;
  //   const poem = this.data.poems[index];
  //   wx.showToast({
  //     title: `编辑：${poem.title}`,
  //     icon: 'none',
  //     duration: 1000
  //   });
  //   // 这里可以跳转到编辑页面
  // },

  // 删除按钮点击事件
  onDeleteTap(event) {
    const index = event.currentTarget.dataset.index;
    const poems = this.data.poems;
    const deletedPoem = poems.splice(index, 1)[0];
    this.setData({ poems });

    // 更新 globalData.poems
    const { dynastyName, poetName } = this.data;
    globalData.poems[dynastyName][poetName] = poems;

    this.setData({ offset: 0 });

    let backStep = 0;
    if (poems.length === 0) {
      delete globalData.poems[dynastyName][poetName];
      backStep = 1;
      if (Object.keys(globalData.poems[dynastyName]).length === 0) {
        delete globalData.poems[dynastyName]; // 删除 dynastyName
        backStep = 2;
      }
    }
    savePoem(globalData.poems, globalData.defaultPoemsPath);

    if (backStep > 0) {
      wx.navigateBack({
        delta: backStep,
        success: () => {
        }
      });
    }

    wx.showToast({
      title: "删除成功",
      duration: 1000
    });

  }

});