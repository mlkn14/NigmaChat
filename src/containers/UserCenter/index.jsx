import React, { Component } from 'react'
import {Button, WhiteSpace, WingBlank, Result,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {reqUser} from '../../api'


var promise = null
export default class UserCenter extends Component {
    state = {
        username: 'username',
        signature: 'islam itu indah',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg'
    }

    componentDidMount(){
        const userid = Cookies.get('userid')
        promise = reqUser({userid})
        promise.then(value=>{
            const response = value.data
            if(response.code===1){
                this.props.history.replace('/login')
                return
            }else{
                const {username, signature, avatar, message} = response.data
                this.setState({username})
                if(signature!=='') this.setState({signature})
                if(avatar!=='') this.setState({avatar})
                if(message!=='') this.setState({message})
            }
        })
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    changeInformation = ()=>{
        this.props.history.push('/changeInformation')
    }


    logout = ()=>{
        Modal.alert('stop', 'Apakah Anda yakin ingin keluar??', [
            {text: 'Membatalkan'},
            {
              text: 'Tentu',
              onPress: ()=> {
                Cookies.remove('userid')
                this.props.history.replace('/login')
              }
            }
          ])
    }

    render() {
        const {username, signature, avatar} = this.state
        return (
            <div >
                <Result title={username} message={<span>{signature}</span>}
                img={<img src={avatar} alt='avatar' style={{width:'60px', height:'60px'}} />} /> 
                <WhiteSpace/>
                <WingBlank>
                <Button type='primary' onClick={this.changeInformation}>Edit Profile</Button>
                <Button type='ghost' onClick={this.logout}>Keluar</Button>
                </WingBlank>
            </div>
        )
    }
}
