import {Redirect, Route, Switch} from 'react-router-dom'
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import UserCenter from '../../containers/UserCenter'
import NotFound from '../../components/NotFound';
import React, { Component } from 'react'
import ChangeInformation from '../../containers/ChangeInformation';
import Chat from '../../containers/Chat';
import '../../assets/css/style.css'
import MessageDetail from '../../containers/MessageDetail';
import Cookies from 'js-cookie'
import {reqUser} from '../../api'


var promise = null
class Main extends Component {
  state = {
    msgid: ''
  }

  componentWillUnmount(){
    if(promise){
      Promise.race([promise, Promise.resolve()])
    }
  }

  componentDidMount(){
    const userid = Cookies.get('userid')
    if(!userid){
        this.props.history.replace('/login')
    }else{
      promise = reqUser({userid})
      promise.then(value=>{
        const response = value.data
        if(response.code===1){
          this.props.history.replace('/login')
          return
        }
      })
    }
  }

  render() {
    const pathname = this.props.location.pathname
    let title = 'NigmaRoom'
    if(pathname==='/'){
      return <Redirect to='/chat'/>
    }else if(pathname==='/chat'){
      title = 'NigmaChat'
    }else if(pathname==='/usercenter'){
      title = 'UserUtama'
    }else if(pathname==='/changeInformation'){
      title = 'GantiInformasi'
    }

    return (
      <div className="App"> 
        <Header title={title} />
        <Switch>
          <Route path='/chat' component={Chat} />
          <Route path='/message/:msgid' component={MessageDetail} />
          <Route path='/usercenter' component={UserCenter} />
          <Route path='/changeInformation' component={ChangeInformation} /> 
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
