const ui = require('../utils/ui')
const base_url = 'https://www.wanandroid.com'

const request = function(method){

    return (obj)=>{
        console.log(`request obj`)
        console.log(obj)

        if(!obj || !obj.url) return
        if(obj.showLoading != false){
            ui.showLoading("加载中...")
        }
        var data = {}
        if(obj.data) data = obj.data
        var header = {'content-type': 'application/json'}

      if (!obj.url.startsWith('http')){
        obj.url = base_url + obj.url
      }
        try {
            var value = wx.getStorageSync('cookie')
            if (value) {
                header['cookie'] = value
            }
          } catch (e) {
            // Do something when catch error
          }
        wx.request({
            url : encodeURI(obj.url),
            method: method,
            data: data,
            header: header,
            success: (res)=>{
                console.log(res)
                if(!res.data || res.statusCode >= 300 || res.statusCode < 200) {
                    ui.showToast("接口请求失败, 请稍后重试!")
                    if (obj.fail) {
                        obj.fail()
                    }
                    return
                }
                if(res.data.errorCode < 0) {
                    ui.showToast(res.data.errorMsg)
                    if (obj.fail) {
                        obj.fail()
                    }
                    return
                }
                if(obj.success) {
                    if (obj.obtainResponse) {
                        obj.success(res)
                    } else {
                        obj.success(res.data.data)
                    }
                }
            },
            fail: ()=>{
                ui.showToast("接口请求失败, 请稍后重试!")
                if (obj.fail) {
                    obj.fail()
                }
            },
            complete: ()=>{
                ui.hideLoading()
            }
        })
    }
}

module.exports = {
    get: request('GET'),
    post: request('POST'),
    delete: request('DELETE'),
    put: request('PUT')
}
