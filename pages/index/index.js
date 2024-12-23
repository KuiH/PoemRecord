Page({
  data: {
    poems: {
      唐: {
        李白: [{ title: "TITLE", content: "wwww,wwww,wwwww,wwwww" }]
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
      未来: {
        未来诗人: [{ title: "TITLEY", content: "wwww,wwww,wwwww,wwwww" }]
      },
    },
    dynasties: [] // 用于存储朝代名称
  },

  onLoad() {
    // 从 poems 数据中提取朝代名称
    const dynasties = Object.keys(this.data.poems);
    this.setData({
      dynasties: dynasties
    });
  }
});