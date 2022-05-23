import React, { Component } from 'react'
import { List, } from 'antd'

import {PlayCircleOutlined} from '@ant-design/icons'
import '../assets/css/hot.css'
export default class SongList extends Component{
    state = {
        list: [],
        coverImgUrl: ''
    }
    // 热歌榜接口
    getPlayList() {
        this.$http.get('/playlist/detail?id=' + this.props.match.params.id).then(res => {
            this.setState({ coverImgUrl: res.playlist.coverImgUrl, list: res.playlist.tracks })
        })
    }
    UNSAFE_componentWillMount() {
        this.getPlayList()
    }
    render() {
        return (
            <div className="hot-container">
                <div className="coverImg" style={{ backgroundImage: 'url(' + this.state.coverImgUrl + ')' }}></div>
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
