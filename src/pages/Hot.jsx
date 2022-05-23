import React, { Component } from 'react'
import { List, } from 'antd'

import {PlayCircleOutlined} from '@ant-design/icons'
import '../assets/css/hot.css'
export default class Hot extends Component {
    state = {
        hotSongs: [],
        coverImgUrl: ''
    }
    // 热歌榜接口
    getHotSongs() {
        this.$http.get('/top/list?idx=1').then(res => {
            this.setState({ coverImgUrl: res.playlist.coverImgUrl, hotSongs: res.playlist.tracks })
        })
    }
    UNSAFE_componentWillMount() {
        this.getHotSongs()
    }
    render() {
        return (
            <div className="hot-container">
                <div className="coverImg" style={{ backgroundImage: 'url(' + this.state.coverImgUrl + ')' }}></div>
                <List
                    size="large"
                    dataSource={this.state.hotSongs}
                    renderItem={item => <List.Item
                        onClick={()=>this.props.history.push(`/play/${item.id}`)} 
                        actions={[<PlayCircleOutlined style={{ fontSize: 22 }} />]}>{item.name}</List.Item>}
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
