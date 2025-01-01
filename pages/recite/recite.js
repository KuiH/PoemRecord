// pages/recite/recite.js
Page({

  data: {
    dynasty: '', // 朝代
    poet: '', // 诗人
    content: [], // 古诗内容
    title: '' // 古诗标题
  },

  onLoad() {
    // 获取事件通道
    const eventChannel = this.getOpenerEventChannel();

    // 监听 sendData 事件，接收数据
    eventChannel.on('sendPoemData', (data) => {
      console.log(data);
      this.setData({
        dynasty: data.dynasty,
        poet: data.poet,
        content: data.content,
        title: data.title,
        isPoem: data.isPoem
      });
    });
  }
})