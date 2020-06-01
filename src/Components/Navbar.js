import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../media/images/remaster2.png'
import './styles/Navbar.css'
import Avatar from './Avatar'
import SearchBar from './SearchBar'


class Navbar extends React.Component {
    render() {
        return(
            <div className="Navbar">
                <ul className="nav">
                    <li className="logo_Container">
                        <Link to="#"><img alt="logo" className="logo" src={logo}/></Link>
                        </li>
                    <li><SearchBar/></li>
                    <li className="button_personaliza">
                        <Link to="#">¡Personaliza!</Link>
                        </li>
                    <li>
                        <Link to="#"><span className="icon-shopping-cart-solid cart-icon"></span></Link>
                        </li>
                    <li className="avatarImg">
                        <Link to="#"><Avatar/></Link>
                        </li>
                </ul>
            </div>
        )
    }
}

export default Navbar;