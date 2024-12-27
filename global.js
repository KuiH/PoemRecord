// global.js
const globalData = {
  poems: null // 初始化为 null
};

// 模拟加载数据
const loadData = () => {
  globalData.poems = {
    唐: {
      李白: [
        { title: "TITLE1TITLE1TITLE1", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字", content: "wwww,wwww,wwwww,wwwww" },
        { title: "TITLE3·TITL4E啊啊啊啊", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" },
        { title: "假装这是一首诗的名字而且不是一般长", content: "wwww,wwww,wwwww,wwwww" }
      ],
      杜甫: [{ title: "TITLE杜甫", content: "wwww,wwww,wwwww,wwwww" }],
      白居易: [{ title: "TITLE白居易", content: "wwww,wwww,wwwww,wwwww" }],
      白1: [{ title: "TITLE白居易", content: "wwww,wwww,wwwww,wwwww" }],
      白2: [{ title: "TITLE白居易", content: "wwww,wwww,wwwww,wwwww" }],
      白3: [{ title: "TITLE白居易", content: "wwww,wwww,wwwww,wwwww" }],
      白4: [{ title: "TITLE白居易", content: "wwww,wwww,wwwww,wwwww" }],
      白5: [{ title: "TITLE白居易", content: "wwww,wwww,wwwww,wwwww" }],
      白6: [{ title: "TITLE白居易", content: "wwww,wwww,wwwww,wwwww" }],
    },
    宋: {
      苏轼: [{ title: "TITLES", content: "wwww,wwww,wwwww,wwwww" }]
    },
    元: {
      元谋: [{ title: "TITLEY", content: "wwww,wwww,wwwww,wwwww" }]
    },
    近现代: {
      近现代诗人: [{ title: "TITLEY", content: "wwww,wwww,wwwww,wwwww" }]
    },
    未来1: {
      未来诗人: [{ title: "TITLEY", content: "wwww,wwww,wwwww,wwwww" }]
    },
    未来2: {
      未来诗人: [{ title: "TITLEY", content: "wwww,wwww,wwwww,wwwww" }]
    },
    未来3: {
      未来诗人: [{ title: "TITLEY", content: "wwww,wwww,wwwww,wwwww" }]
    },
    未来4: {
      未来诗人: [{ title: "TITLEY", content: "wwww,wwww,wwwww,wwwww" }]
    },
    未来5: {
      未来诗人: [{ title: "TITLEY", content: "wwww,wwww,wwwww,wwwww" }]
    },
  };
};

// 初始化加载数据
loadData();

// 导出全局变量
module.exports = globalData;