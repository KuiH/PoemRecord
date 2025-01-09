const globalData = require('../../global.js');
const { savePoem } = require('../../utils/util');

Page({
  data: {
    dynasties: [], // 用于存储朝代名称
    showModal: false, // 是否显示弹窗
    inputContent: '', // 输入的文本内容
    isPoem: true, // 是否为古诗
    parsedContent: null // 解析后的内容
  },

  onLoad() {
    // 从全局数据中提取朝代名称
    // console.log(globalData.poems)
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
    // 显示弹窗
    this.setData({
      showModal: true,
      inputContent: '',
      parsedContent: null
    });
  },

  onCloseModal() {
    // 关闭弹窗
    this.setData({
      showModal: false
    });
  },

  onBackTap() {
    this.onCloseModal();
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  onInputChange(e) {
    // 更新输入内容
    this.setData({
      inputContent: e.detail.value
    });
    // console.log(this.data.inputContent);
  },

  onRadioChange(e) {
    // 更新是否为古诗
    this.setData({
      isPoem: e.detail.value === 'true'
    });
  },

  onParseTap() {
    const { inputContent } = this.data;
    const lines = inputContent.split('\n')
      .map(line => line.trim()) // 对每一行调用 trim()
      .filter(line => line !== ''); // 过滤掉空行

    if (lines.length < 2) {
      wx.showToast({
        title: '输入内容不完整',
        icon: 'none',
        duration: 1000
      });
      return;
    }

    // 解析标题
    const title = lines[0].trim();
    // 解析朝代和诗人
    const dynastyPoet = lines[1].trim();
    const dynastyMatch = dynastyPoet.match(/\[(.*?)\]/);
    const dynasty = dynastyMatch ? dynastyMatch[1] : '';
    const poet = dynastyPoet.replace(/\[.*?\]/, '').trim();
    // 解析内容
    const content = lines.slice(2).join('\n').trim();

    // 一行中标点符号小于两个就认为是诗
    const punctuationRegex = /[。，,.、；：！？]/g;
    const matches = lines[2].match(punctuationRegex);
    const isPoem = matches && matches.length > 2 ? false : true;

    this.setData({
      parsedContent: {
        title,
        dynasty,
        poet,
        content
      },
      isPoem: isPoem
    });
  },

  onTitleChange(e) {
    // 更新标题
    this.setData({
      parsedContent: {
        ...this.data.parsedContent,
        title: e.detail.value
      }
    });
  },

  onDynastyChange(e) {
    // 更新朝代
    this.setData({
      parsedContent: {
        ...this.data.parsedContent,
        dynasty: e.detail.value
      }
    });
  },

  onPoetChange(e) {
    // 更新诗人
    this.setData({
      parsedContent: {
        ...this.data.parsedContent,
        poet: e.detail.value
      }
    });
  },

  onContentChange(e) {
    // 更新内容
    this.setData({
      parsedContent: {
        ...this.data.parsedContent,
        content: e.detail.value
      }
    });
  },

  onConfirmTap() {
    const { parsedContent, isPoem } = this.data;
    const { title, dynasty, poet, content } = parsedContent;

    if (!title || !dynasty || !poet || !content) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1000
      });
      return;
    }

    // 添加到 globalData.poems
    if (!globalData.poems[dynasty]) {
      globalData.poems[dynasty] = {};
    }
    if (!globalData.poems[dynasty][poet]) {
      globalData.poems[dynasty][poet] = [];
    }

    const isExist = globalData.poems[dynasty][poet].some(poem => poem.title === title);
    if (isExist) {
      wx.showToast({
        title: '诗词已存在',
        icon: 'none',
        duration: 1000
      });
      return;
    }

    globalData.poems[dynasty][poet].push({
      title,
      content: content.split('\n'),
      is_poem: isPoem
    });

    // 更新页面数据
    const dynasties = Object.keys(globalData.poems);
    this.setData({
      dynasties,
      showModal: false
    });

    const { poems, defaultPoemsPath } = globalData;
    savePoem(poems, defaultPoemsPath);

    wx.showToast({
      title: '添加成功',
      duration: 1000
    });
  },

  backToTextarea() {
    this.setData({
      parsedContent: null
    });
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
        duration: 1000
      });
      this.setData({
        dynasties: Object.keys(importedPoems) // 更新页面中的朝代列表
      });
    } catch (error) {
      wx.showToast({
        title: error.message || '导入失败',
        icon: 'none',
        duration: 1000
      });
    }
  },


  onSaveTap() {
    const { poems, defaultPoemsPath } = globalData;
    savePoem(poems, defaultPoemsPath);
    wx.showToast({
      title: '保存成功',
      duration: 1000
    });
  }
});