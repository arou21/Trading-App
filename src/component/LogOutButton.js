import React, { Component } from 'react'
import { Navigate } from 'react-router'
export default class LogOutButton extends Component {
    constructor(props){
        super(props) 
        this.state={
            redirect: false
        }
    }
    onclick=async ()=>{
        console.log('logOut')
      
   this.props.logMeOut()
   this.setState({redirect:true})
   

    }
  render() {
    if (this.state.redirect){
        this.setState({redirect:false})
       return <Navigate to="/"/> 
    }
    return (
        <button onClick={this.onclick}type="submit" className="btn btn-primary">LogOut</button>
    )
  }
}
