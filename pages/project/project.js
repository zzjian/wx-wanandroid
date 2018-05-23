// pages/project/project.js
var loadMoreView, page
const http = require('../../utils/http')
const ui = require('../../utils/ui')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 0
    wx.setNavigationBarTitle({
      title: "项目"
    })
    loadMoreView = this.selectComponent("#loadMoreView")
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadData: function() {
    var that = this
    http.get({
      url: `http://www.wanandroid.com/project/list/${page}/json?cid=294`,
      showLoading: page == 0,
      success: (res)=>{
        var items = that.data.items
        if(page == 0) {
          items = res.datas
        } else {
          items = items.concat(res.datas)
        }
        that.setData({
          items: items
        })
        loadMoreView.loadMoreComplete(res)
      }
    })
  },
  loadMoreListener: function(e) {
    page += 1
    this.loadData()
  },
  clickLoadMore: function(e) {
    this.loadData()
  },
  clickItem: function(e) {
    var link = this.data.items[e.currentTarget.id].link
    ui.navigateTo(`../../pages/detail/detail?link=${link}`)
  }

})