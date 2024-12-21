// components/dynasty-poet-box/dynasty-poet-box.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: ''
    },
    navigateBaseUrl: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      wx.navigateTo({
        url: `${this.properties.navigateBaseUrl}?content=${this.properties.content}`
      });
    }
  }
})