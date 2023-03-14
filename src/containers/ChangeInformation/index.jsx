import React, { Component } from 'react'
import {List, InputItem, Button,WhiteSpace,Toast, Result} from 'antd-mobile'
import { reqUpdateUser } from '../../api'
import Cookies from 'js-cookie'


var promise = null
export default class ChangeInformation extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        signature: '',
        avatar: ''
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    handleChange = (name, value)=>{
        this.setState({[name]: value})
    }

    save = ()=>{
        const {username, password, password2, signature, avatar} = this.state
        if(username===''){
            Toast.info('Nama pengguna tidak boleh kosong!', 1);
            return
        }else if(password===''){
            Toast.info('Kata sandi tidak boleh kosong!', 1);
            return
        }else if(password2===''){
            Toast.info('Silakan masukkan kata sandi anda lagi!', 1);
            return
        }else if(password!==password2){
            Toast.info('Kata sandi yang dimasukkan dua kali tidak konsisten!', 1);
            return
        }
        
        const userid = Cookies.get('userid')
        promise = reqUpdateUser({userid, username, password, signature, avatar})
        promise.then(value=>{
            const response = value.data 
            if(response.code===0){
                this.props.history.replace('/login')
            }else{
                Toast.info(response.msg, 1)
            }
        })
    }


    render() {
        return (
            <div>
                <List>
                <InputItem placeholder='Masukkan Nama' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
                <InputItem placeholder='Masukkan Password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
                <InputItem placeholder='Masukkan Konfirmasi Password' type="password" onChange={val => {this.handleChange('password2', val)}}>Konfirmasi:</InputItem>
                <InputItem placeholder='Masukkan Deskripsi' onChange={val => {this.handleChange('signature', val)}}>Deskripsi:</InputItem>
                <InputItem placeholder='Masukkan URL Profil' onChange={val => {this.handleChange('avatar', val)}}>URL Profil:</InputItem>
                <WhiteSpace/>
                </List>
                
                <Result img={<img style={{width:'60px',height:'60px'}} src={this.state.avatar} alt='Tinjauan'/>}  />
                <Button type='primary' onClick={this.save}>Simpan</Button>
            </div>
        )
    }
}
