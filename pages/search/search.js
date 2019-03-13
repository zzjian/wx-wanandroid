// pages/search/search.js
const http = require('../../utils/http')
const ui = require('../../utils/ui')
var searchHistory = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotkey: [],
    friends: [],
    colors: ['rgb(77, 204, 246)', 'rgb(255, 153, 153)', 'rgb(153, 153, 51)', 
    'rgb(0, 153, 153)', 'rgb(255, 153, 0)', 'rgb(77, 204, 246)', 'rgb(255, 153, 153)', 'rgb(153, 153, 51)', 
  'rgb(0, 153, 153)', 'rgb(255, 153, 0)'],
    historyView: {
      anim:{},
      height: 0,
      isShow: false
    },
    system:{},
    searchHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "搜索"
    })
    this.loadHotkey()
    this.loadFriend()

    var that = this
    wx.getStorage({
      key: 'searchHistory',
      success: function(res){
        searchHistory = res.data.split(',')
      },
      fail: function() {
        searchHistory = []
      },
      complete: function() {
        that.data.searchHistory = searchHistory
      }
    })
    
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          system: res
        })
      }
    })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadHotkey: function() {
    var that = this
    http.get({
      url: `/hotkey/json`,
      success: (res)=>{
        res.forEach(item => {
          item.bcolor = that.data.colors[parseInt(Math.random()*10)]
        });
        that.setData({
          hotkey: res
        })
      }
    })
  },
  loadFriend: function() {
    var that = this
    http.get({
      url: `/friend/json`,
      success: (res)=>{
        res.splice(0, 1)
        res.forEach(item => {
          item.bcolor = that.data.colors[parseInt(Math.random()*10)]
        });
        that.setData({
          friends: res
        })
      }
    })
  },
  search: function(e) {
    this.saveSearchHistory(e.detail.value)
    ui.navigateTo(`../../pages/article/list?title=${e.detail.value}&scenes=SEARCH`)
    this.closeHistoryView()
  },
  clickHotkey: function(e) {
    this.saveSearchHistory(e.currentTarget.dataset.name)
    ui.navigateTo(`../../pages/article/list?title=${e.currentTarget.dataset.name}&scenes=SEARCH`)
  },
  clickWebItem: function(e) {
    var link = e.currentTarget.dataset.link
    ui.toDetail(link)
    // ui.navigateTo(`../../pages/detail/detail?link=${link}`)
  },
  clickHostoryItem: function(e) {
    this.saveSearchHistory(e.currentTarget.dataset.key)
    ui.navigateTo(`../../pages/article/list?title=${e.currentTarget.dataset.key}&scenes=SEARCH`)
  },
  saveSearchHistory: function(key) {
    var index =  searchHistory.findIndex(item=>{
      return item == key
    })
    if(index != -1) {
      searchHistory.splice(index, 1)
    }
    searchHistory.unshift(key)
    wx.setStorage({
      key:'searchHistory',
      data: searchHistory.join()
    })
  },
  inputSearch: function(e) {
    console.log(e)
    var curr = searchHistory.filter(item=> item.includes(e.detail.value))
    this.setData({
      searchHistory: curr
    })
  },
  obtainInputFocus: function(e){
    this.setData({
      'historyView.isShow': true,
      searchHistory: this.data.searchHistory
    })
    var bgAnim = wx.createAnimation({
        duration: 300,
        timingFunction: "ease-out"
    })
    bgAnim.opacity(1).step()
    setTimeout(function () {
        this.setData({
            'historyView.anim': bgAnim.export()
        })
    }.bind(this), 100)
  },
  closeHistoryView: function(e){
    var anim = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-out"
    })
    anim.opacity(0).step()

    this.setData({'historyView.anim': anim.export()})
    setTimeout(function () {
        this.setData({
              'historyView.isShow': false
        })
    }.bind(this), 300)
  },
  catchTouchMove:()=>{
    
  }
})