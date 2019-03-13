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
    selectedView: 'article',
    float: false
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
      
    this.loadBanner()
    this.loadData('article', true)
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
    page = 0
    this.loadBanner()
    this.loadData(this.data.selectedView, false)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    loadMoreView.loadMore()
  },

  onPageScroll: function(e) {
    console.log(e)
    if(e.scrollTop >= this.data.system.windowWidth/9*5 && !this.data.float) {
        this.setData({
          float: true
        })
    } else if (e.scrollTop < this.data.system.windowWidth/9*5 && this.data.float) {
      this.setData({
        float: false
      })
    }
  },
  switchView: function(e) {
    page = 0
    this.loadData(e.target.id, true)
  },
  loadBanner: function() {
    var that = this
    http.get({
      url: `/banner/json`,
      showLoading: false,
      success:(res)=>{
          that.setData({
            indicatorDots : res.length > 1,
            ads: res
          })
        }
    })
  },
  loadData: function(viewType, showLoading) {
    var that = this
    http.get({
      url: `/${viewType}/list/${page}/json`,
      showLoading: showLoading,
      success: (res)=>{
          var items = that.data.items
          if(page == 0) {
            items = res.datas
            wx.stopPullDownRefresh()
          } else {
            items = items.concat(res.datas)
          }
          that.setData({
            items: items,
            selectedView: viewType
          })
          loadMoreView.loadMoreComplete(res)
      },
      fail: ()=> {
        if(page!=0) {
          loadMoreView.loadMoreFail() 
        }
      }
    })
  },
  loadMoreListener: function(e) {
    page += 1
    this.loadData(this.data.selectedView, false)
  },
  clickLoadMore: function(e) {
    this.loadData(this.data.selectedView, false)
  },
  clickItem: function(e) {
    var link = this.data.items[e.currentTarget.id].link
    ui.toDetail(link)
    // ui.navigateTo(`../../pages/detail/detail?link=${link}`)
  },
  clickAdItem: function(e) {
    var url = e.currentTarget.dataset.url
    ui.toDetail(url)
    // ui.navigateTo(`../../pages/detail/detail?link=${url}`)
  }
})