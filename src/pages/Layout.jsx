import React, { Component, Suspense } from 'react'

import routes from '../router/routes'
import RouterView from '../router/RouterView'

import { HashRouter, NavLink } from 'react-router-dom'

import { PageHeader, Button } from 'antd'

import '../assets/css/layout.css'

export default class Layout extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <div className="header">
                        <PageHeader
                            className="site-page-header"
                            title="优音乐"
                        />
                        <Button className="header-btn" shape="round" >下载App</Button>
                    </div>
                    <div className="navbar">
                        <NavLink to="/recommend" className="link">推荐</NavLink>
                        <NavLink to="/hot" className="link">热歌</NavLink>
                        <NavLink to="/search" className="link">搜索</NavLink>
                    </div>
                    <Suspense fallback={<h1>loading...</h1>}>
                        <RouterView routes={routes} />
                    </Suspense>
                </div>
            </HashRouter>

        )
    }
}
