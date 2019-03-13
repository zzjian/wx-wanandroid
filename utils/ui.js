export const showToast = function(content,duration) {
    if(!duration) duration = 2000
    wx.showToast({
        title: content,
        icon: 'none',
        duration: duration,
    })
}

var isShowLoading = false
export const showLoading = function(title) {
    if(isShowLoading) return
    wx.showLoading({
        title: title?title:'',
        mask:true,
        success:()=>{
            isShowLoading = true
        }
    })
}

export const hideLoading = function() {
    if(!isShowLoading) return
    isShowLoading = false
    wx.hideLoading()
}

var isClick = false
export const navigateTo = (url)=>{
    if(isClick) return
    isClick = true
    wx.navigateTo({
        url: url,
        success: function(res){
            // success
        },
        fail: function() {
            // fail
        },
        complete: function() {
            // complete
            
        }
    })
    setTimeout(()=>{isClick = false},500)
}


export const toDetail = (url)=>{
  wx.setClipboardData({
    data: url,
    success(res) {
      wx.getClipboardData({
        success(res) {
          showToast('链接已复制，请在浏览器中打开')
        }
      })
    }
  })
  //  navigateTo(`../../pages/detail/detail?link=${url}`)
}