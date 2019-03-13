// pages/navigation/navigation.js
const http = require('../../utils/http')
const ui = require('../../utils/ui')

var statusLayout
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

    statusLayout = this.selectComponent("#statusLayout")

    wx.setNavigationBarTitle({
      title: "导航"
    })
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  loadData: function() {
    var that = this
    http.get({
      url: `/navi/json`,
      showLoading: false,
      success: (res)=>{
        that.setData({
          items: res
        })
        statusLayout.showContent()
      },
      fail: ()=> {
        statusLayout.showError()
      }
    })
  },
  clickItem: function(e) {
    var link = e.currentTarget.dataset.link
    ui.toDetail(link)
    // ui.navigateTo(`../../pages/detail/detail?link=${link}`)
  },
  search: function() {
    ui.navigateTo(`../../pages/search/search`)
  },
  reload: function(){
    statusLayout.showLoading()
    this.loadData()
  }
})