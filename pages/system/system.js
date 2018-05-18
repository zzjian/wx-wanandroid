// pages/system/system.js
const http = require('../../utils/http')
const ui = require('../../utils/ui')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    treeList:[],
    expandId: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "体系"
    })
    var that = this
    http.get({
      url: `http://www.wanandroid.com/tree/json`,
      success: (res) => {
          that.setData({
            treeList: res
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
  openChildren: function(e) {
    this.setData({
      expandId: this.data.expandId == e.currentTarget.id ? -1: e.currentTarget.id
    })
  },
  clickChildItem: function(e) {
    ui.navigateTo(`../../pages/article/list/list?cid=${e.currentTarget.id}&title=${e.currentTarget.dataset.title}`)
  }
})