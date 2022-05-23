import React, { Component } from 'react'
import { Input, message, Divider, Button, List } from 'antd';
import { UserOutlined,PlayCircleOutlined } from '@ant-design/icons';

import '../assets/css/search.css'
export default class Search extends Component {
    state = {
        // 关键词
        keywords: '',
        // 搜索结果
        list: [],
        // 热门搜索
        hotSearch: []
    }
    keywordsChange(e) {
        this.setState({ keywords: e.target.value })
    }
    submit(e) {
        if (e.keyCode === 13) {
            this.search()
        }
    }
    // 搜索接口
    search() {
        if (this.state.keywords.trim() === '') {
            return message.error('请输入搜索关键词');
        }
        this.$http.get('/search', {
            params: {
                keywords: this.state.keywords
            }
        }).then(res => {
            this.setState({ list: res.result.songs })
        })
    }
    // 热门搜索
    hotSearch() {
        this.$http.get('/search/hot').then(res => {
            this.setState({ hotSearch: res.result.hots })
        })
    }

    UNSAFE_componentWillMount() {
        this.hotSearch()
    }
    
    // 点击热词
    clickBtn(val){
        this.setState({keywords:val})
        this.$http.get('/search', {
            params: {
                keywords: val
            }
        }).then(res => {
            this.setState({ list: res.result.songs })
        })
    }

    render() {
        return (
            <div className="search-container">
                {/* 搜索框 */}
                <Input value={this.state.keywords} onKeyUp={(e) => { this.submit(e) }} onChange={(e) => { this.keywordsChange(e) }} className="inp" size="large" placeholder="请输入关键词" prefix={<UserOutlined />} />
                <Divider />
                {/* 热词 */}
                <div className="hot-group">
                    {
                        this.state.hotSearch.map((item, index) => {
                            return <Button onClick={()=>{this.clickBtn(item.first)}} key={index} className='hot-btn'>{item.first}</Button>
                        })
                    }
                </div>
                {/* 搜索结果 */}
                <Divider />
                <List
                    size="large"
                    dataSource={this.state.list}
                    renderItem={item => <List.Item onClick={()=>this.props.history.push(`/play/${item.id}`)} actions={[<PlayCircleOutlined style={{ fontSize: 22 }} />]}>{item.name}</List.Item>}
                />
            </div>
        )
    }
    componentWillUnmount(){
        this.setState=()=>{
            return false
        }
    }
}
