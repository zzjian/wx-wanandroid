// pages/search/search.js
const http = require('../../utils/http')
const ui = require('../../utils/ui')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotkey: [],
    friends: [],
    colors: ['rgb(77, 204, 246)', 'rgb(255, 153, 153)', 'rgb(153, 153, 51)', 
    'rgb(0, 153, 153)', 'rgb(255, 153, 0)', 'rgb(77, 204, 246)', 'rgb(255, 153, 153)', 'rgb(153, 153, 51)', 
  'rgb(0, 153, 153)', 'rgb(255, 153, 0)']  
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
      url: `http://www.wanandroid.com//hotkey/json`,
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
      url: `http://www.wanandroid.com/friend/json`,
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
  search: (e)=> {
    ui.navigateTo(`../../pages/article/list?title=${e.detail.value}`)
  },
  clickHotkey: function(e) {
    ui.navigateTo(`../../pages/article/list?title=${e.currentTarget.dataset.name}`)
  },
  clickWebItem: function(e) {
    var link = e.currentTarget.dataset.link
    ui.navigateTo(`../../pages/detail/detail?link=${link}`)
  }
})