// components/poem-box/poem-box.js
Component({
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },
    dynasty: {
      type: String,
      value: '' // 朝代
    },
    poet: {
      type: String,
      value: '' // 诗人
    },
    content: {
      type: Array,
      value: '' // 古诗内容
    },
    isPoem: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tappoembox', {
        dynasty: this.properties.dynasty,
        poet: this.properties.poet,
        content: this.properties.content,
        title: this.properties.title,
        isPoem: this.properties.isPoem
      });
    }
  }
})