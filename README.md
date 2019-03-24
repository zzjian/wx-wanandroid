# wx-wanandroid

wx-wanandroid 是根据 [wanandroidAPI](http://www.wanandroid.com/blog/show/2) 实现的微信小程序客户端, UI 部分直接取自 [官网](http://wanandroid.com) , 项目中 icon 全来自 [iconfont](http://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a). 表示感谢!!!

 所有功能基本根据 [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/) 提供的 API 实现, 对小程序感兴趣的同学不妨拿这个项目练练手。项目仅供学习使用, 请勿用作其它用途！(持续完善中, 感兴趣的小伙伴不妨点个 Star ~)

## 效果
### gif
<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/gif.gif"/>

### 截图
<div>
<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E9%A6%96%E9%A1%B5.png"/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E9%A6%96%E9%A1%B52.png"/>

<br/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E5%AF%BC%E8%88%AA.png"/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E4%BD%93%E7%B3%BB.png"/>
<br/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E9%A1%B9%E7%9B%AE.png"/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E6%88%91%E7%9A%84.png"/>
<br/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E7%99%BB%E5%BD%95.png"/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E6%90%9C%E7%B4%A2.png"/>
<br/>
<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E6%90%9C%E7%B4%A22.png"/>


<img width="270" height="480" src="https://raw.githubusercontent.com/zzjian/wx-wanandroid/70fcbde7e0e2458fe1138c7b6c234531f9635d00/preview/%E6%94%B6%E8%97%8F.png"/>
<br/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E5%B8%96%E5%AD%90.png"/>

<img width="270" height="480" src="https://raw.githubusercontent.com/wiki/zzjian/wx-wanandroid/preview/%E8%AF%A6%E6%83%85.png"/>
</div>


### 如何安装
由于 api 是 http 的, 并且小程序不支持个人开发者打开外链, 所以项目目前只能使用开发者工具预览

1. 先将项目 clone 到本地
2. 使用小程序开发工具打开项目, 没有的点击 [这里](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 下载安装
3. 如果无法正常打开网页, 看下是否勾上 `<不校验合法域名...>` 然后重新编译。 -> 位于开发者工具右上角详情里

### `突然发现在手机上使用只要打开调试就好了`
想体检的可以在 issues 中留下你的微信号，我给你添加体验权限即可 `名额有限, 只能有15个`

你也可以自己在 [微信公众平台](https://mp.weixin.qq.com) 申请小程序 appid 然后上传代码体检即可

打开微信扫一扫即可体验
![扫描二维码体验](https://upload-images.jianshu.io/upload_images/4753754-1119eaf13eb806e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### todolist
- [x] ~~大部分功能及 ui 2018-05-21~~
- [x] ~~完善登录注册功能模块 2018-05-22~~
- [x] ~~完善加载更多组件 2018-05-28~~
- [ ] 细节优化
- [ ] 添加下拉刷新功能
- [x] ~~https 2019-03-13~~
- [ ] 处理 webview 外链问题

## License
    Copyright 2018 zzjian

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.


