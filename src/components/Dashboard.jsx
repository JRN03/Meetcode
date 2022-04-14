import React from 'react'
import Cookies from 'js-cookie'
import img from '../images/person1.png'
import img2 from '../images/person2.png'
import img3 from '../images/person3.png'
import hello from "../images/hello.png"

const Dashboard = ({findRoom,setUser,setAuth}) => {

  const logout = () => {
    Cookies.set('user','');
    Cookies.set('token','');
    setUser('');
    setAuth(false);
  }

  return (

    <div className = "dash">
        <div className = "dash-wrapper">
          <div className='header'>
              <h1>
                <span>{"<"}</span> Meetcode <span>{"/>"}</span>
              </h1>
              <button onClick = {logout} className = "logout">Logout</button>
          </div>
          <hr/>
          <div className = "dash-content">
            <div className = "dash-text">
                <h1>Come meet likeminded coders and developers to tackle common coding interview questions</h1>
                <p className = "subscript">Because learning together is better than learning alone</p>
                <button onClick = {findRoom}>Let's Get Started</button>
            </div>
            <div className = "images">
              <img alt='' id="blue" src={img}/>
              <img alt='' id="red" src={img2}/>
              <img alt='' id="orange" src={img3}/>
              <img alt='' id="hello1" src={hello}/>
              <img alt='' id="hello2" src={hello}/>
              <img alt='' id="hello3" src={hello}/>
            </div>
          </div>
        </div>
    </div>

  )
}

export default Dashboard