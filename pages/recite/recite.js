// pages/recite/recite.js
Page({
  data: {
    dynasty: '',
    poet: '',
    title: '',
    isPoem: true,
    isReciting: false,
    originalContent: [], // 原始内容
    currentContent: [""], // 当前显示的内容
    nextWordInCurPara: 0, // 背诵模式时，记录当前段落展示的下一个字的下标
    punctuations: ['。', '，', ',', '.', '、', '；', '：', '！', '？', ';', '!', '?'],
    nonPoemPunctuations: ['。', '.', '、', '；', '：', '！', '？', ';', '!', '?']
  },

  onLoad() {
    const eventChannel = this.getOpenerEventChannel();

    // 监听 sendData 事件，接收数据
    eventChannel.on('sendPoemData', (data) => {
      this.setData({
        dynasty: data.dynasty,
        poet: data.poet,
        title: data.title,
        isPoem: data.isPoem,
        originalContent: data.content,
        currentContent: data.content
      });
    });
  },

  // 开始背诵
  startRecite() {
    this.setData({
      isReciting: true,
      currentContent: [""] // 清空内容
    });
  },

  // 是否展示完了当前诗词
  _isPoemFinish() {
    const { originalContent, currentContent, nextWordInCurPara } = this.data;
    return originalContent.length == currentContent.length && originalContent.at(-1).length == nextWordInCurPara;
  },

  // 显示一个字
  showOneWord() {
    if (this._isPoemFinish()) {
      return;
    }

    let { originalContent, currentContent, nextWordInCurPara } = this.data;
    const curParaIndex = currentContent.length - 1;
    if (originalContent[curParaIndex].length <= nextWordInCurPara) { // 一段完成
      currentContent.push(originalContent[curParaIndex + 1][0]);
      nextWordInCurPara = 1;
    }
    else {
      let addWords = originalContent[curParaIndex][nextWordInCurPara];
      nextWordInCurPara++;
      if (this.data.punctuations.includes(originalContent[curParaIndex][nextWordInCurPara])) { //跳过标点
        addWords += originalContent[curParaIndex][nextWordInCurPara];
        nextWordInCurPara++;
      }
      currentContent[curParaIndex] += addWords;
    }

    this.setData({
      currentContent: currentContent,
      nextWordInCurPara: nextWordInCurPara
    });
  },

  _nextSentenceEnd(para, begin, punctuations){
    let sentenceEndIndex = -1;
    for (let i = begin; i < para.length; i++) {
      if (punctuations.includes(para[i])) {
        sentenceEndIndex = i;
        break;
      }
    }
    return sentenceEndIndex;
  },

  // 显示一句话
  showOneSentence() {
    if (this._isPoemFinish()) {
      return;
    }

    let { originalContent, currentContent, nextWordInCurPara } = this.data;
    const curParaIndex = currentContent.length - 1;
    const targetPunctuations = (this.data.isPoem ? this.data.punctuations : this.data.nonPoemPunctuations);

    if (originalContent[curParaIndex].length <= nextWordInCurPara) { // 一段完成
      const sentenceEndIndex = this._nextSentenceEnd(originalContent[curParaIndex + 1], 0, targetPunctuations);
      nextWordInCurPara = sentenceEndIndex+1;
      currentContent.push(originalContent[curParaIndex + 1].slice(0, nextWordInCurPara)); // 添加新段落
    }
    else { // 从 nextWordInCurPara 开始查找第一个出现在 targetPunctuations 中的字符
      const currentParagraph = originalContent[curParaIndex];
      const sentenceEndIndex = this._nextSentenceEnd(currentParagraph, nextWordInCurPara, targetPunctuations);
      const sentence = currentParagraph.substring(nextWordInCurPara, sentenceEndIndex + 1);
      nextWordInCurPara = sentenceEndIndex + 1;
      currentContent[curParaIndex] += sentence;
    }

    this.setData({
      currentContent: currentContent,
      nextWordInCurPara: nextWordInCurPara
    });

  },

  // 显示一片段
  showOneFragment() {
    if (this._isPoemFinish()) {
      return;
    }

    let { originalContent, currentContent, nextWordInCurPara } = this.data;
    const curParaIndex = currentContent.length - 1;

    if (originalContent[curParaIndex].length <= nextWordInCurPara) { // 一段完成
      currentContent.push(originalContent[curParaIndex + 1]);
      nextWordInCurPara = originalContent[curParaIndex + 1].length;
    }
    else {
      const currentParagraph = originalContent[curParaIndex];
      currentContent[currentContent.length - 1] = currentParagraph;
      nextWordInCurPara = currentParagraph.length;
    }

    this.setData({
      currentContent: currentContent,
      nextWordInCurPara: nextWordInCurPara
    });
  },

  // 结束背诵
  endRecite() {
    this.setData({
      isReciting: false,
      currentContent: this.data.originalContent,
      nextWordInCurPara: 0
    });
  }
});