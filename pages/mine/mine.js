// pages/mine/mine.js
const ui = require('../../utils/ui')
const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '未登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "我的"
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
    var that = this
    wx.getStorage({
      key: 'username',
      success: function(res){
        that.setData({
          username: res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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
  clickAboutus: function() {
    ui.toDetail('https://wanandroid.com/about')
    // ui.navigateTo(`../../pages/detail/detail?link=https://wanandroid.com/about`)
  },
  toLogin: function() {
    if(this.data.username != '未登录') return
    ui.navigateTo(`../../pages/login/login`)
  },
  clickCollect: function(){
    if(this.data.username == '未登录') {
      ui.navigateTo(`../../pages/login/login`)
      return
    } 
    ui.navigateTo(`../../pages/article/list?title=我的收藏&scenes=COLLECT`)
  },
  logout: function() {
    var that = this
    wx.removeStorage({
      key: "username"
    })
    wx.removeStorage({
      key: "cookie",
      complete: function() {
        that.setData({
          username: '未登录'
        })
      }
    })
  }
})