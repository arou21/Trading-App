import React, { Component, useEffect, useState } from "react";
import Login from "./views/Login";
import Signup from "./views/Signup";
// import Home from './views/Home';
import Nav from "./component/Nav";
import News from "./views/News";
import Account from "./views/Account";
import Buystock from "./views/Buystock";
import MarketData from "./views/MarketData";

// import ToDo from './views/ToDo';
// import Profile from './views/Profile';
// import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { loadCredentials, setCredentials } from "./fetch";
import Trade from "./views/Trade";
import Stockwatch from "./views/Stockwatch";

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    loadCredentials()
  }, []);

  const logMeIn = (user) => {
    setUser(user);
  };
  const logMeOut = () => {
    setUser({});
  };

  return (
    <BrowserRouter>
      <div>
        <Nav user={user} logMeOut={logMeOut} />
        <Routes>
          {/* <Route path='/home' element={<Home />}/> */}
          {/* <Route path='/' element={<Home />}/> */}
          <Route path="/signIn" element={<Login logMeIn={logMeIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/news" element={<News />} />
          <Route path="/account" element={<Account />} />
          <Route path="/buystock" element={<Buystock user={user} />} />
          <Route path="/marketdata" element={<MarketData />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/Stockwatch" element={<Stockwatch user={user} />} />

          {/* <Route path='/todo' element={<ToDo myList={this.state.myList} handleToDoSubmit={this.addToDo} deleteToDo={this.deleteToDo}/>}/> */}
          {/* <Route path='/profile' element={<Profile/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
