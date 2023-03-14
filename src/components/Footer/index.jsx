import { TabBar } from 'antd-mobile'
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './style.css'

class Footer extends Component {   
    render() {
        const pathname = this.props.location.pathname

        return (
            <div className='my-footer'>
                <TabBar>
                    <TabBar.Item title='NigmaChat'
                    icon={{uri: require(`../../assets/imgs/chat.png`).default}}
                    selectedIcon={{uri: require(`../../assets/imgs/chat-selected.png`).default}}
                    selected={pathname==='/chat'}
                    onPress={() => this.props.history.replace('/chat')}/>

                    <TabBar.Item title='Personal Center'
                    icon={{uri: require(`../../assets/imgs/usercenter.png`).default}}
                    selectedIcon={{uri: require(`../../assets/imgs/usercenter-selected.png`).default}}
                    selected={pathname==='/usercenter'}
                    onPress={() => this.props.history.replace('/usercenter')}/>
                </TabBar>
            </div>
        )
    }
}

export default withRouter(Footer);
