import { Card } from 'antd-mobile'
import React, { Component } from 'react'
import { reqMessage } from '../../api'

var promise = null
export default class MessageDetail extends Component {
    state = {
        message: {}
    }

    componentDidMount(){
        const pathname = this.props.location.pathname
        const msgid = pathname.substring(9, pathname.length)
        promise = reqMessage({msgid})
        promise.then(value=>{
            this.setState({message: value.data})
        })
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    render() {
             
        const {message} = this.state
        return (
            <Card>
                <Card.Header
                    title={message.from}
                    extra={<span>{message.time}</span>}
                />
                <p id='msg-content' style={{margin: '1em', wordWrap: "break-word"}}>
                    {message.content}
                </p>
            </Card>
        )
    }
}
