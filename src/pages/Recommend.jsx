import React, { Component } from 'react'

import { Carousel, List, Card } from 'antd'

import {PlayCircleOutlined} from '@ant-design/icons'

import '../assets/css/recommend.css'
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

export default class Recommend extends Component {
    state = {
        banners: [],
        personalized: [],
        newsongs:[]
    }
    // 轮播图接口
    getBanner() {
        this.$http.get('/banner').then(res => {
            this.setState({ banners: res.banners })
        })
    }
    // 推荐歌单接口
    getPersonalized() {
        this.$http.get('/personalized').then(res => {
            this.setState({ personalized: res.result })
        })
    }
    // 最新音乐
    getNewSongs() {
        this.$http.get('/personalized/newsong').then(res => {
            this.setState({ newsongs: res.result })
        })
    }
    UNSAFE_componentWillMount() {
        this.getBanner()
        this.getPersonalized()
        this.getNewSongs()
    }
    render() {
        return (
            <div className="rec-container">
                {/* 轮播图 */}
                <Carousel autoplay>
                    {
                        this.state.banners.map((item, index) => {
                            return <div key={index}>
                                <div style={contentStyle}>
                                    <img className="bannerImg" src={item.imageUrl} alt="" />
                                </div>
                            </div>
                        })
                    }
                </Carousel>
                {/* 推荐歌单 */}
                <div className="rec-music">
                    <h3>推荐歌单</h3>
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={this.state.personalized}
                        renderItem={item => (
                            <List.Item>
                                <Card onClick={()=>this.props.history.push(`/songlist/${item.id}`)}>
                                    <img src={item.picUrl} alt="" />
                                    <h5>{item.name.substr(0, 8)}...</h5>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
                {/* 最新音乐 */}
                <div className="new-music">
                    <h3>最新音乐</h3>
                    <List 
                        size="large"
                        dataSource={this.state.newsongs}
                        renderItem={item => <List.Item onClick={()=>this.props.history.push(`/play/${item.id}`)} actions={[<PlayCircleOutlined style={{fontSize:22}} />]}>{item.name}</List.Item>}
                    />
                </div>
            </div>
        )
    }
    componentWillUnmount(){
        this.setState=()=>{
            return false
        }
    }

}
