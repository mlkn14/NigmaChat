import React, { Component } from 'react'
import {NavBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'


class Header extends Component {
    render() {
        const {title} = this.props
        return (
            <NavBar leftContent='Back' className='sticky-header'
            onLeftClick={()=>this.props.history.goBack()}
            >{title}</NavBar>
        )
    }
}

export default withRouter(Header);