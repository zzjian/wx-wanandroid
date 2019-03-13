// pages/project/project.js
var loadMoreView, page
const http = require('../../utils/http')
const ui = require('../../utils/ui')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectCategory: {},
    categories:[],
    expandView: {
      isShow: false,
      anim: {},
      expandAnim: {},
      rotateAnim: {}
    },
    items: [],
    system: {}
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
    var that = this


    http.get({
      url: `/project/tree/json`,
      success: (res)=>{
        that.setData({
          categories: res,
          selectCategory: res[0]
        })
        this.loadData()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    setTimeout(function(){
      // 延迟获取是为了解决真机上 windowHeight 值不对的问题
      wx.getSystemInfo({
        success: function(res) {
          console.log(res)
          that.setData({
            system: res
          })
        },
      })
    }, 500)
  },

  _onScrollToLower: function () {
    loadMoreView.loadMore()
  },

  loadData: function() {
    var that = this
    http.get({
      url: `/project/list/${page}/json?cid=${that.data.selectCategory.id}`,
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
    ui.toDetail(link)
    // ui.navigateTo(`../../pages/detail/detail?link=${link}`)
  },
  switchCategory: function(e) {
    this.setData({
      selectCategory: e.currentTarget.dataset.category
    })
    page = 0 
    this.loadData()
  },
  expandCategory: function(e) {
    if(this.data.expandView.isShow) {
      this.closeExpandView()
      return
    }
    this.setData({
      'expandView.isShow': true
    })
    var bgAnim = wx.createAnimation({
        duration: 300,
        timingFunction: "ease-out"
    })
    bgAnim.opacity(1).step()

    var expandAnim = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-out"
    })
    expandAnim.height(this.data.system.windowHeight*0.5).step()

    var rotateAnim = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-out"
    })
    rotateAnim.rotate(-180).step()

    setTimeout(function () {
        this.setData({
            'expandView.anim': bgAnim.export(),
            'expandView.expandAnim': expandAnim.export(),
            'expandView.rotateAnim': rotateAnim.export()
        })
    }.bind(this), 100)
  },
  closeExpandView: function(e) {
    var expandAnim = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-out"
    })
    expandAnim.height(0).step()

    var anim = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-out"
    })
    anim.opacity(0).step()

    var rotateAnim = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-out"
    })
    rotateAnim.rotate(0).step()

    this.setData({'expandView.anim': anim.export(),'expandView.expandAnim': expandAnim.export(),'expandView.rotateAnim': rotateAnim.export()})
    setTimeout(function () {
        this.setData({
              'expandView.isShow': false
        })
    }.bind(this), 300)
  }
})