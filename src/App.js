import React, { Component, useState } from 'react'
import Login from './views/Login';
import Signup from './views/Signup';
// import Home from './views/Home';
import Nav from './component/Nav';
import News from './views/News';
import Account from './views/Account';

// import ToDo from './views/ToDo';
// import Profile from './views/Profile';
// import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


export default function App() {

  const [user, setUser] = useState({});

    const logMeIn = (user) => {
        setUser(user)
    };
    const logMeOut = () => {
        setUser({})
    };
  
  
    return (
      <BrowserRouter>
      <div>
      <Nav user={user} logMeOut={logMeOut}/>
         <Routes> 
           {/* <Route path='/home' element={<Home />}/> */}
           {/* <Route path='/' element={<Home />}/> */}
           <Route path='/signIn' element={<Login logMeIn={logMeIn}/>} />
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/news' element={<News/>}/>
           <Route path='/account' element={<Account/>}/>
           
           {/* <Route path='/todo' element={<ToDo myList={this.state.myList} handleToDoSubmit={this.addToDo} deleteToDo={this.deleteToDo}/>}/> */}
           {/* <Route path='/profile' element={<Profile/>}/> */}
           
       </Routes> 
        

       </div>
      </BrowserRouter> 
      
    )
  }

