# blog.zhuanpu.xyz
--
app中的container是主要入口目录  
此目录中的文件下只要有index.html文件(之后统称为page文件) 就会新建为路由  
e.g. 路由/home 会访问 /container/home/index.html  

每一个page都会被当做独立的域，当中必须包含一个control入口文件index.js和一个view入口文件index.html及样式入口文件index.less  
所有的引用都应该通过index进行引用
在视图文件中 无需手动引用index 只需引用布局文件（也就是头和尾）  
e.g.  
```
    <begin head='head' foot='foot'>
        your app
    </begin>   
```  
head和foot会自动引入container下base目录中的对应视图文件 （即 /container/base/head.html /container/base/head.html）      

关于common  
考虑到页面对公共包的缓存问题，建立了公共模块提取  
需要提取的模块可在 config 中配置 默认放在 container/base 中  
考虑到 公共样式不经常更改 并且 头尾可能会更改 这里需要手动引入  
e.g. 在congfig中配置了一个文件 base.less 应在head中加入  
```
<link href="css/base.css" />
```  

关于component及filter util 等等  
由于控制了入口文件 所以组件和其他工具类 就可以自己随便组织了 只要引入了就会编译  
值得一提的是 可以在config中配置全局目录 这样用起来就更加方便了




