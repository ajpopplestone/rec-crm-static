import React from 'react';
import Clock from 'react-live-clock';
import './Header.css';

const Header = ( props ) => {
    // let loginDetail = ''
    // if (props.loginUser) {
    //   loginDetail = props.loggedIn
    // }
    
    return (
        <div className='menu-container'>
          <div className='menu'>
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/London'} />
            <h1>Recruitment for Dummies</h1>
            <div className='links'>
              <div className='user' onClick={props.logOut}>{props.loginUser ? 'Log Out' : ''}</div>
              <div className='loginButton'>{props.loginUser ? props.loginUser : ''}</div>
            </div>
          </div>
        </div>
    )
}
export default Header;
