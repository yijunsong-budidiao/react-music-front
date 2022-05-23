import React from 'react'
// 组件懒加载
let Recommend = React.lazy(()=>import('../pages/Recommend'))
let Hot = React.lazy(()=>import('../pages/Hot'))
let Search = React.lazy(()=>import('../pages/Search'))
let SongList = React.lazy(()=>import('../pages/SongList'))
let Play = React.lazy(()=>import('../pages/Play'))

let routes = [
    {
        path:'/',
        redirect:'/recommend',
        exact:true
    },
    {
        path:'/recommend',
        component:Recommend,
        exact:false
    },
    {
        path:'/hot',
        component:Hot,
        exact:false
    },
    {
        path:'/search',
        component:Search,
        exact:false
    },
    {
        path:'/songlist/:id',
        component:SongList,
        exact:false
    },
    {
        path:'/play/:id',
        component:Play,
        exact:false
    },
]

export default routes;