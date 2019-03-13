// pages/system/system.js
const http = require('../../utils/http')
const ui = require('../../utils/ui')
var statusLayout
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
    statusLayout = this.selectComponent("#statusLayout")

    wx.setNavigationBarTitle({
      title: "体系"
    })
    var that = this
    http.get({
      url: `/tree/json`,
      showLoading: false,
      success: (res) => {
          that.setData({
            treeList: res
          })
          statusLayout.showContent()
        },
        fail: ()=> {
          statusLayout.showError()
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  openChildren: function(e) {
    this.setData({
      expandId: this.data.expandId == e.currentTarget.id ? -1: e.currentTarget.id
    })
  },
  clickChildItem: function(e) {
    ui.navigateTo(`../../pages/article/list?cid=${e.currentTarget.id}&title=${e.currentTarget.dataset.title}`)
  },
  reload: function(){
    statusLayout.showLoading()
    this.loadData()
  }
})