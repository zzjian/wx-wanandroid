// pages/article/list/list.js
const http = require('../../../utils/http')
const ui = require('../../../utils/ui')
var cid, page, loadMoreView, title, statusLayout
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[]
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
    wx.setNavigationBarTitle({
      title: title
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
    if(!loadMoreView.hasMore())return
    page += 1
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadData: function() {
    
    if(cid) {
      http.get({
        url: `http://www.wanandroid.com/article/list/${page}/json?cid=${cid}`,
        showLoading: false,
        success: this.success
      })
    } else {
      http.post({
        url: `http://www.wanandroid.com/article/query/${page}/json?k=${title}`,
        showLoading: false,
        success: this.success
      })
    }
    
  },
  clickItem: function(e) {
    var link = this.data.items[e.currentTarget.id].link
    ui.navigateTo(`../../../pages/detail/detail?link=${link}`)
  },
  success: function(res) {
    loadMoreView.loadFinish(res)
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
  }
})