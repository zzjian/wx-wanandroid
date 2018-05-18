// components/loadMoreView/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      hasMore: {
        type: Boolean,
        value: false
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
    loadFinish: function(data) {
        var hasMore = false
        if(data.curPage < data.pageCount) {
          hasMore = true
        }

        this.setData({
          hasMore: hasMore
        })
    },
    hasMore: function() {
      return this.properties.hasMore
    }
  }
})
