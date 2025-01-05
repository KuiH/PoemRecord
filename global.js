// global.js
const globalData = {
  poems: null, // 初始化为 null
  defaultPoemsPath: null
};

// 模拟加载数据
const loadData = () => {
  globalData.poems = {
    唐: {
      李白: [
        { title: "啊啊啊啊啊啊啊啊啊啊啊", content: ["伫倚危楼风细细，望极春愁，黯黯生天际。草色烟光残照里，无言谁会凭阑意。", "拟把疏狂图一醉，对酒当歌，强乐还无味。衣带渐宽终不悔，为伊消得人憔悴。"], is_poem: false },
        { title: "一二三四五，六七八九十。", content: ["一二三四五，六七八九十。", "一二三四五，六七八九十。"], is_poem: true },
        { title: "wwww,wwww。", content: ["wwww,wwww。", "wwww,wwww。", "wwww,wwww。"], is_poem: true },
        { title: "一二三四五，", content: ["一二三四五，", "六七八九十。","六七八九十。","六七八九十。","六七八九十。","六七八九十。", "六七八九十。","六七八九十。","六七八九十。","六七八九十。","六七八九十。"], is_poem: true },
        { title: "假装这是一首诗的名字而且不是一般长", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true },
        { title: "假装这是一首诗的名字而且不是一般长", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true },
        { title: "假装这是一首诗的名字而且不是一般长", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true },
        { title: "假装这是一首诗的名字而且不是一般长", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true },
        { title: "假装这是一首诗的名字而且不是一般长", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true },
        { title: "假装这是一首诗的名字而且不是一般长", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true },
        { title: "假装这是一首诗的名字而且不是一般长", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true },
        { title: "假装这是一首诗的名字而且不是一般长", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }
      ],
      杜甫: [{ title: "TITLE杜甫", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }],
      白居易: [{ title: "TITLE白居易", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }],
      白1: [{ title: "TITLE白居易", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }],
      白2: [{ title: "TITLE白居易", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }],
      白3: [{ title: "TITLE白居易", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }],
      白4: [{ title: "TITLE白居易", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }],
      白5: [{ title: "TITLE白居易", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }],
      白6: [{ title: "TITLE白居易", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }],
    },
    宋: {
      苏轼: [{ title: "TITLES", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
    元: {
      元谋: [{ title: "TITLEY", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
    近现代: {
      近现代诗人: [{ title: "TITLEY", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
    未来1: {
      未来诗人: [{ title: "TITLEY", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
    未来2: {
      未来诗人: [{ title: "TITLEY", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
    未来3: {
      未来诗人: [{ title: "TITLEY", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
    未来4: {
      未来诗人: [{ title: "TITLEY", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
    未来5: {
      未来诗人: [{ title: "TITLEY", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
    未来6: {
      未来诗人: [{ title: "TITLEY", content: ["wwww,wwww。", "wwwww啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊问问啊啊啊啊啊", "wwwww。"], is_poem: true }]
    },
  };
  globalData.defaultPoemsPath = `${wx.env.USER_DATA_PATH}/poems.json`;
};

// 初始化加载数据
loadData();

// 导出全局变量
module.exports = globalData;