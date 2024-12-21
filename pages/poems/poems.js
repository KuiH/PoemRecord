Page({
  data: {
    poetName: '',
    poems: []
  },

  onLoad(options) {
    const poet = options.content; // 从参数中获取诗人名称
    this.setData({
      poetName: poet
    });

    // 根据诗人名称获取诗集
    this.fetchPoems(poet);
  },

  fetchPoems(poet) {
    // 模拟根据诗人名称获取诗集
    let poems = [];
    switch (poet) {
      case '李白':
        poems = ['静夜思', '将进酒', '望庐山瀑布'];
        break;
      case '杜甫':
        poems = ['春望', '登高', '绝句'];
        break;
      case '白居易':
        poems = ['赋得古原草送别', '长恨歌', '琵琶行'];
        break;
      case '苏轼':
        poems = ['水调歌头', '江城子', '赤壁赋'];
        break;
      case '辛弃疾':
        poems = ['青玉案·元夕', '破阵子', '永遇乐'];
        break;
      case '李清照':
        poems = ['如梦令', '声声慢', '醉花阴'];
        break;
      default:
        poems = ['暂无诗集'];
    }

    this.setData({
      poems: poems
    });
  }
});