import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Register from './containers/Register'
import Main from './containers/Main'
import Login from './containers/Login'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route component={Main}></Route>
      </Switch>
    )
  }
}
