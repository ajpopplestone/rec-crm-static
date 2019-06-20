import React from 'react';
import Clock from 'react-live-clock';
import './Header.css';

const Header = ( props ) => {
    return (
        <div class='menu-container'>
          <div class='menu'>
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/London'} />
            <div class='links'>
              <div class='signup'>Sign Up</div>
              <div class='login'>Login</div>
            </div>
          </div>
        </div>
    )
}
export default Header;