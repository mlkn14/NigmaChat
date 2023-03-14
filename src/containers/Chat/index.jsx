import React, { Component } from 'react'
import {InputItem, List} from 'antd-mobile'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import Cookies from 'js-cookie'
import {reqMessages, reqUser} from '../../api'
import './style.css'


var promise = null
export default class Chat extends Component {
  state = {
      username: 'Personal Name',
      content: '',
      messages: []
  }


  componentDidUpdate () {
    const chatMsg = document.getElementById('chat-msg')
    chatMsg.scrollTo(0, chatMsg.scrollHeight)
  }

  componentWillUnmount(){
    clearInterval(this.interval)

    if(promise){
      Promise.race([promise, Promise.resolve()])
    } 
  }

  componentDidMount() {
    this.interval = setInterval(()=>{
      promise = reqMessages()
      promise.then(value=>{
          this.setState({messages:value.data})
      })
    }, 2000)


    const userid = Cookies.get('userid')
    promise = reqUser({userid})
    promise.then(value=>{
      const response = value.data
      if(response.code===1){
        this.props.history.replace('/login')
        return 
      }else{
        const {username} = response.data
        this.setState({username}) 
      }
    })



    const chatMsg = document.getElementById('chat-msg')
    chatMsg.scrollTo(0, chatMsg.scrollHeight)

    promise = reqMessages()
    promise.then(value=>{
      if(this.state.messages.length===0){
        this.setState({messages:value.data})
      }
    })
    

    if(!io.socket) {

      io.socket = io('ws://localhost:4000', {transports: ['websocket']})
    }

    io.socket.on('chat', msg=>{
      let {messages} = this.state
      messages = [...messages, msg]
      this.setState({messages})
    })
  }



  sendMsg = ()=>{

    const {username, content} = this.state
    if(!io.socket) {

      io.socket = io('ws://localhost:4000', {transports: ['websocket']})
    }
    io.socket.emit('chat', {id:nanoid(), from:username, content, time: new Date().toTimeString()})
    this.setState({content: ''})
  }


  viewMsg = (msgid)=>{
    return ()=>{
      this.props.history.push(`/message/${msgid}`)
    }
  }

  render() {
    const {messages} = this.state
    return (
      <div>
        <div id='chat-msg'>
        <List>
          {
            messages.map(message=>{

              return <List.Item key={message.id} onClick={this.viewMsg(message.id)}>
                      {message.from}:&nbsp;{message.time}
                      <List.Item.Brief>{message.content}</List.Item.Brief>
                    </List.Item>
            })
          } 
        </List>
        </div>
        <div id='input-item'>
          <InputItem onChange={val => this.setState({content: val})}
          value={this.state.content}
          extra={<span onClick={this.sendMsg}>Send</span>} /> 
        </div>
          
              
     </div>
    )}
}
