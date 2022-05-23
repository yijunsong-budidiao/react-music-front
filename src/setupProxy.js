const proxy=require('http-proxy-middleware');
module.exports=function(app){
    // 注册跨域请求中间件
    app.use(proxy.createProxyMiddleware('/api',{
        // 真实数据接口地址
        target:'http://localhost:4000',
        // 将接口地址中不需要的部分删除掉
        pathRewrite:{
            '/api':''
        }
    }))
}