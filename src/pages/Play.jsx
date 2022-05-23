import React, { Component } from 'react'
import '../assets/css/play.css'
export default class Play extends Component {
    state={
        // 音乐详情
        songInfo:{},
        // 播放状态,true表示暂停
        playStatus:true,
        // 音乐播放地址
        playUrl:'',
        // 歌词
        lyric:[]
    }
    // 获取音乐详情
    getSongDetail(){
        this.$http.get('/song/detail',{
            params:{
                ids:this.props.match.params.id
            }
        }).then(res=>{
            this.setState({songInfo:res.songs[0].al})
        })
    }
    // 修改播放状态
    toggle(){
        this.setState({playStatus:!this.state.playStatus},()=>{
            if(this.state.playStatus) {
                this.refs.audio.pause()
            } else {
                this.refs.audio.play()
            }
        })
    }

    // 获取音乐播放地址
    getPlayUrl(){
        this.$http.get('/song/url',{
            params:{id:this.props.match.params.id}
        }).then(res=>{
            this.setState({playUrl:res.data[0].url})
        })
    }

    // 获取歌词
    getLyric(){
        this.$http.get('/lyric',{
            params:{id:this.props.match.params.id}
        }).then(res=>{
            let lyric = this.lyricFmt(res.lrc.lyric)
            this.setState({lyric:lyric})
        })
    }
    lyricFmt(lyric){
        let reg = /(\[.*\])(.*)/g
        let arr = []
        lyric.replace(reg,function(all,first,second){
            if(second !== '') {
                arr.push(second)
            }
        })
        return arr
    }

    UNSAFE_componentWillMount(){
        this.getSongDetail()
        this.getPlayUrl()
        this.getLyric()
    }
    render() {
        return (
            <div className="play-container">
                <div className="play-tool" style={{transform:this.state.playStatus?'rotate(-15deg)':'rotate(0deg)'}}></div>
                <div className="play-box">
                    <img src={this.state.songInfo.picUrl} alt=""/>
                    <div onClick={()=>this.toggle()} className={this.state.playStatus?'btn-pause':'btn-play'}></div>
                </div>
                <div className="content">
                    <h2>{this.state.songInfo.name}</h2>
                    {
                        this.state.lyric.map((item,index)=>{
                           return <p key={index}>{item}</p>
                        })
                    }
                </div>
                {/* 音乐播放标签，隐藏 */}
                <audio ref="audio" src={this.state.playUrl} style={{display:'none'}}></audio>
            </div>
        )
    }
    componentWillUnmount(){
        this.setState=()=>{
            return false
        }
    }
}
