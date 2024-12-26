// global.js
const globalData = {
  poems: null // 初始化为 null
};

// 模拟加载数据
const loadData = () => {
  globalData.poems = {
    唐: {
      李白: [
        { title: "TITLE1", content: "wwww,wwww,wwwww,wwwww" },
        { title: "TITLE2", content: "wwww,wwww,wwwww,wwwww" },
        { title: "TITLE3", content: "wwww,wwww,wwwww,wwwww" },
        { title: "TITL4E", content: "wwww,wwww,wwwww,wwwww" }
      ],
      杜甫: [{ title: "TITLE杜甫", content: "wwww,wwww,wwwww,wwwww" }],
      白居易: [{ title: "TITLE白居易", content: "wwww,wwww,wwwww,wwwww" }],
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