// pages/home/home.js
var loadMoreView, page
const http = require('../../utils/http')
const ui = require('../../utils/ui')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    ads: [],
    system: {},
    items:[],
    selectedView: 'article'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 0
    wx.setNavigationBarTitle({
      title: "首页"
    })
    var that = this
    loadMoreView = that.selectComponent("#loadMoreView")

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          system: res
        })
      },
    })
      
    http.get({
      url: `http://www.wanandroid.com/banner/json`,
      success:(res)=>{
          var indicatorDots = false
          if(res.length > 1) {
            indicatorDots = true
          }
          that.setData({
            indicatorDots : indicatorDots,
            ads: res
          })
        }
    })
    
    this.loadData('article')
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
      this.loadData(this.data.selectedView)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  switchView: function(e) {
    
    page = 0
    this.loadData(e.target.id)
  },
  loadData: function(viewType) {
    var that = this
    http.get({
      url: `http://www.wanandroid.com/${viewType}/list/${page}/json`,
      showLoading: page == 0,
      success: (res)=>{
        loadMoreView.loadFinish(res)
        var items = that.data.items
        if(page == 0) {
          items = res.datas
        } else {
          items = items.concat(res.datas)
        }
        that.setData({
          items: items,
          selectedView: viewType
        })
      }
    })
  },
  clickItem: function(e) {
    var link = this.data.items[e.currentTarget.id].link
    ui.navigateTo(`../../pages/detail/detail?link=${link}`)
  }
})