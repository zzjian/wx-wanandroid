// pages/login/login.js
const http = require('../../utils/http')
const ui = require('../../utils/ui')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  formSubmit: function(e) {
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    
    if(!username||username.length==0) {
      ui.showToast('请输入用户名!')
      return
    }
    if(!password||password.length==0) {
      ui.showToast('请输入密码!')
      return
    }

    http.post({
      url: `http://www.wanandroid.com/user/login?username=${username}&password=${password}`,
      obtainOriginalData: true,
      success: (res) => {
          wx.setStorage({
            key: "username",
            data: username
          })
          wx.setStorage({
            key: "cookie",
            data: res.header['Set-Cookie'],
            success: ()=>{
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
                success: function(res){
                  ui.showToast('登录成功')
                },
                fail: function() {
                  // fail
                },
                complete: function() {
                  // complete
                }
              })
            }
          })
      }
    })
  }
})