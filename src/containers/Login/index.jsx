import { NavBar,WhiteSpace, InputItem,Button,List,Toast } from 'antd-mobile'
import React, { Component } from 'react'
import {reqLogin} from '../../api'


var promise = null
export default class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    login = () =>{
        const {username, password} = this.state
        promise = reqLogin({username, password})
        promise.then(value=>{
            const response = value.data
            if(response.code===0){
                this.props.history.replace('/chat')
            }else{
                Toast.info(response.msg, 1);
            }
        })
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        return (
            <div>
                <NavBar>Masuk</NavBar>
                <List>
                    <InputItem placeholder='Username' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
                    <InputItem placeholder='Password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.login}>Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.toRegister}>Register</Button>
                </List>
            </div>
        )
    }
}
