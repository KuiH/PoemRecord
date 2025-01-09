// global.js
const globalData = {
  poems: null, // 初始化为 null
  defaultPoemsPath: null
};

const defaultPoemsData = {
  唐: {},
};

// 模拟加载数据
const loadData = () => {
  globalData.defaultPoemsPath = `${wx.env.USER_DATA_PATH}/poems.json`;
  const fs = wx.getFileSystemManager()
  // 先判断文件是否存在
  try {
    fs.accessSync(globalData.defaultPoemsPath);
    const res = fs.readFileSync(globalData.defaultPoemsPath, 'utf8', 0);
    // console.log(JSON.parse(res));
    globalData.poems = JSON.parse(res);
  } catch(e) {
    globalData.poems = defaultPoemsData;
    // console.error(e)
  }
};

// 初始化加载数据
loadData();

// 导出全局变量
module.exports = globalData;