// pages/article/list/list.js
const http = require('../../utils/http')
const ui = require('../../utils/ui')
var cid, page, loadMoreView, title, statusLayout, scenes
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    isCollectPage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 0;
    loadMoreView = this.selectComponent("#loadMoreView")
    statusLayout = this.selectComponent("#statusLayout")
    cid = options.cid
    title = options.title
    scenes = options.scenes
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      isCollectPage: scenes==='COLLECT'
    })
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    loadMoreView.loadMore()
    // if(!loadMoreView.hasMore())return
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadData: function() {
    
    if(scenes == 'COLLECT') {
      http.get({
        url: `/lg/collect/list/${page}/json`,
        showLoading: false,
        success: this.success,
        fail: this.fail
      })
    } else if(scenes == 'SEARCH') {
      http.post({
        url: `/article/query/${page}/json?k=${title}`,
        showLoading: false,
        success: this.success,
        fail: this.fail
      })
    } else {
      http.get({
        url: `/article/list/${page}/json?cid=${cid}`,
        showLoading: false,
        success: this.success,
        fail: this.fail
      })
    }
  },
  clickItem: function(e) {
    var link = this.data.items[e.currentTarget.id].link
    ui.toDetail(link)
    // ui.navigateTo(`../../pages/detail/detail?link=${link}`)
  },
  success: function(res) {
    var items = this.data.items
    if(page == 0) {
      items = res.datas
      if(res.datas.length == 0) {
        statusLayout.showEmpty()
      } else {
        statusLayout.showContent()
      }
    } else {
      items = items.concat(res.datas)
    }
    this.setData({
      items: items
    })
    loadMoreView.loadMoreComplete(res)
  },
  fail: ()=>{
    page==0 ? statusLayout.showError() : loadMoreView.loadMoreFail()
  },
  loadMoreListener: function(e) {
    page += 1
    this.loadData()
  },
  clickLoadMore: function(e) {
    this.loadData()
  },
  reload: function(){
    statusLayout.showLoading()
    this.loadData()
  },
  collect: function(e){
    var that = this
    wx.getStorage({
      key: 'username',
      success: function(res){
        that.handleCollect(that, e)
      },
      fail: function(e) {
        ui.navigateTo(`../../pages/login/login`)
      },
      complete: function() {
        // complete
      }
    })
  },
  handleCollect:(that, e)=> {
    var id = that.data.isCollectPage?that.data.items[e.currentTarget.id].originId:that.data.items[e.currentTarget.id].id
    var url=''
    if(that.data.items[e.currentTarget.id].collect||that.data.isCollectPage) {
      url = `/lg/uncollect_originId/${id}/json`
    } else {
      url = `/lg/collect/${id}/json`
    }
    http.post({
      url: url,
      success: (res)=> {
        if(that.data.isCollectPage) {
          that.data.items.splice(e.currentTarget.id, 1)
        } else {
          that.data.items[e.currentTarget.id].collect = !that.data.items[e.currentTarget.id].collect
        }
        that.setData({
          items: that.data.items
        })
      }
      
    })
  }
})