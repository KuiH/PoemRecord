Page({
  data: {
    poets: [],
    dynastyName: ''
  },

  onLoad(options) {
    const name = options.content; // 从参数中获取朝代名称
    this.setData({
      dynastyName: name
    });

    // 根据传入的朝代名称动态获取诗人数据
    this.fetchPoets(name);
  },

  fetchPoets(name) {
    // 模拟根据朝代获取诗人数据
    let poets = [];
    switch (name) {
      case '唐':
        poets = ['李白', '杜甫', '白居易'];
        break;
      case '宋':
        poets = ['苏轼', '辛弃疾', '李清照'];
        break;
      default:
        poets = ['未知朝代'];
    }

    this.setData({
      poets: poets
    });
  }
});