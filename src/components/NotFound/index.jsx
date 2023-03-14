import React, { Component } from 'react'
import {Button} from 'antd-mobile'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>Maaf, halaman tidak ditemukan!!</h2>
                <Button type='primary'
                onClick={()=>this.props.history.replace('/rooms')}
                >Kembali ke daftar ruang obrolan</Button>
            </div>
        )
    }
}
