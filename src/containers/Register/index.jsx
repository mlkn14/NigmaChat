import React, { Component } from 'react'
import {NavBar,InputItem,WhiteSpace,Button,Toast} from 'antd-mobile'
import {reqRegister} from '../../api'

var promise = null
export default class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: '' 
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    register = ()=>{
        const {username, password, password2} = this.state
        if(username===''){
            Toast.info('Nama pengguna tidak boleh kosong!', 1);
            return
        }else if(password===''){
            Toast.info('Kata sandi tidak boleh kosong!', 1);
            return
        }else if(password2===''){
            Toast.info('Silakan masukkan kata sandi Anda lagi!', 1);
            return
        }else if(password!==password2){
            Toast.info('Kata sandi yang dimasukkan dua kali tidak konsisten!', 1);
            return
        }

        promise = reqRegister({username, password})
        promise.then(value=>{
            const response = value.data
            if(response.code===0){
                this.props.history.replace('/chat')
            }else{
                Toast.info(response.msg, 1)
            }
        })
    }


    render() {
        return (
            <div>
                <NavBar>Register</NavBar>
                <InputItem placeholder='Username' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
                <InputItem placeholder='Password' type="password" onChange={val => {this.handleChange('password', val)}}>Password1</InputItem>
                <InputItem placeholder='Confirm Password' type="password" onChange={val => {this.handleChange('password2', val)}}>Password2:</InputItem>

                <WhiteSpace/>
                <Button type='primary' onClick={this.register}>Register</Button>
                <Button onClick={this.toLogin}>Sudah Ada Akun</Button>
            </div>
        )
    }
}
