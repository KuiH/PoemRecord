const globalData = require('../../global.js');
const { savePoem } = require('../../utils/util');

Page({
  data: {
    poetName: '',
    dynastyName: '',
    poems: [],
    offset: 0,
    showEditModal: false, // 是否显示编辑弹窗
    editData: { // 编辑弹窗的数据
      title: '',
      dynasty: '',
      poet: '',
      content: '',
      isPoem: null
    },
    editIndex: -1 // 当前编辑的诗词索引
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

  // 编辑按钮点击事件
  onEditTap(event) {
    const index = event.currentTarget.dataset.index;
    const poem = this.data.poems[index];

    // 设置编辑弹窗的数据
    this.setData({
      showEditModal: true,
      editData: {
        title: poem.title,
        dynasty: this.data.dynastyName,
        poet: this.data.poetName,
        content: poem.content.join('\n'), // 将内容数组转换为字符串
        isPoem: poem.is_poem
      },
      editIndex: index // 保存当前编辑的索引
    });
  },

  // 关闭弹窗
  onCloseEditModal() {
    this.setData({
      showEditModal: false
    });
  },

  onCloseModal() {
    this.onCloseEditModal();
  },


  // 阻止事件冒泡
  stopPropagation() { },

  // 标题输入框变化
  onEditTitleChange(event) {
    const title = event.detail.value;
    this.setData({
      'editData.title': title
    });
  },

  // 朝代输入框变化
  onEditDynastyChange(event) {
    const dynasty = event.detail.value;
    this.setData({
      'editData.dynasty': dynasty
    });
  },

  // 诗人输入框变化
  onEditPoetChange(event) {
    const poet = event.detail.value;
    this.setData({
      'editData.poet': poet
    });
  },

  // 内容输入框变化
  onEditContentChange(event) {
    const content = event.detail.value;
    this.setData({
      'editData.content': content
    });
  },

  // 体裁更新
  onEditRadioChange(e) {
    this.setData({
      'editData.isPoem': e.detail.value === 'true'
    });
  },

  onEditConfirm() {
    const { editData, editIndex, poems, dynastyName, poetName } = this.data;

    // 去除所有空白字符（包括中间的空格、换行符等）
    const newTitle = editData.title.replace(/\s+/g, '');
    const newDynasty = editData.dynasty.replace(/\s+/g, '');
    const newPoet = editData.poet.replace(/\s+/g, '');
    const newContent = editData.content.split('\n') // 按行分割
      .map(line => line.replace(/\s+/g, '')) // 去除每行中的所有空白字符
      .filter(line => line !== '')
      .join('\n'); // 用 \n 拼接

    // 更新诗词数据
    const updatedPoem = {
      title: newTitle,
      content: newContent.split('\n'), // 将内容字符串转换为数组
      is_poem: editData.isPoem // 保留是否为诗的标志
    };

    // 如果朝代或诗人发生变化，先删除再添加
    if (newDynasty !== dynastyName || newPoet !== poetName) {
      poems.splice(editIndex, 1);

      let backStep = 0;
      // 如果原诗人下没有诗词或朝代，删除
      if (poems.length === 0) {
        delete globalData.poems[dynastyName][poetName];
        backStep = 1;
        if (Object.keys(globalData.poems[dynastyName]).length === 0) {
          delete globalData.poems[dynastyName];
          backStep = 2;
        }
      }

      // 在新位置添加诗词
      if (!globalData.poems[newDynasty]) {
        globalData.poems[newDynasty] = {};
      }
      if (!globalData.poems[newDynasty][newPoet]) {
        globalData.poems[newDynasty][newPoet] = [];
      }
      globalData.poems[newDynasty][newPoet].push(updatedPoem);

      if (backStep > 0) {
        wx.navigateBack({
          delta: backStep,
          success: () => {
          }
        });
      }
    }
    else {
      // 如果朝代和诗人未变化，直接更新诗词
      poems[editIndex] = updatedPoem;
      globalData.poems[dynastyName][poetName] = poems;
    }

    // 更新页面数据
    this.setData({
      showEditModal: false,
      poems: poems,
      offset: 0
    });

    // 保存数据
    savePoem(globalData.poems, globalData.defaultPoemsPath);

    // 提示编辑成功
    wx.showToast({
      title: '编辑成功',
      duration: 1000
    });
  },

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