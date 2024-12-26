// components/dynasty-poet-box/dynasty-poet-box.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent('tapbox', { content: this.properties.content });
    }
  }
})