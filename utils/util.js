const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const savePoem = (poems, savePath) => {
  const fs = wx.getFileSystemManager();
  const dataStr = JSON.stringify(poems, null, 2); // 将诗词数据转换为 JSON 字符串

  fs.writeFile({
    filePath: savePath,
    data: dataStr,
    encoding: 'utf8',
    success: (res) => {
      // 提示保存成功
      wx.showToast({
        title: '保存成功',
        duration: 1500
      });
    },
    fail: (err) => {
      wx.showToast({
        title: '保存失败',
        duration: 1500
      });
    }
  });
}

module.exports = {
  formatTime,
  savePoem
}
