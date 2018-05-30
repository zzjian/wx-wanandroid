// components/statusLayout/statusLayout.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rootStyle: {
      type: String,
      value:''
    },
    status: {
      type: String,
      value: 'CONTENT',  //LOADING、CONTENT、EMPTY、ERROR
      observer: function (newVal, oldVal) {
        console.log(newVal)
        if (newVal == oldVal) return
        this.setStatus(newVal)
      }
    },
    emptyImage:{
      type: String,
      value: '../../img/empty.png' 
    },
    emptyText: {
      type: String,
      value: '什么都木有~~'
    },
    emptyImageWidth: {
      type: Number,
      value: 64
    },
    emptyImageHeight: {
      type: Number,
      value: 64
    },
    errorImage: {
      type: String,
      value: '../../img/error.png'
    },
    errorText: {
      type: String,
      value: '操作失败, 请稍后重试!'
    },
    errorImageWidth: {
      type: Number,
      value: 64
    },
    errorImageHeight: {
      type: Number,
      value: 64
    },
    loadingText:{
      type: String,
      value: '加载中, 请稍后...'
    },
    loadingImage: {
      type: String,
      value: '../../img/loading.png'
    },
    loadingImageWidth: {
      type: Number,
      value: 40
    },
    loadingImageHeight: {
      type: Number,
      value: 40
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusText: '',
    statusImage: '',
    loadingAnimation:'',
    imgWidth:100,
    imgHeight: 100,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setStatus: function(status) {
      switch(status) {
        case 'LOADING':
          this.showLoading()
          break
        case 'EMPTY':
          this.showEmpty()
          break
        case 'ERROR':
          this.showError()
          break
        case 'CONTENT':
          this.showContent()
          break
        default:
          console.log("error: 未找到该status")
          break
      }
    },
    showLoading: function(){
      this.setData({
        status: "LOADING",
        statusText: this.properties.loadingText,
        statusImage: this.properties.loadingImage,
        imgWidth: this.properties.loadingImageWidth,
        imgHeight: this.properties.loadingImageHeight
      })
    },
    showEmpty: function(){
      this.setData({
        status: "EMPTY",
        statusText: this.properties.emptyText,
        statusImage: this.properties.emptyImage,
        imgWidth: this.properties.emptyImageWidth,
        imgHeight: this.properties.emptyImageHeight
      })
    },
    showError: function(){
      this.setData({
        status: "ERROR",
        statusText: this.properties.errorText,
        statusImage: this.properties.errorImage,
        imgWidth: this.properties.errorImageWidth,
        imgHeight: this.properties.errorImageHeight
      })
    },
    showContent: function(){
      this.setData({
        status: "CONTENT"
      })
    },
    onClickListener: function(res) {
      if(this.data.status == 'LOADING') return      
      this.triggerEvent('OnClickListener', { status: this.data.status }, {})
    }
  }
})
