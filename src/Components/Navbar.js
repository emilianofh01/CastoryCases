import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../media/images/remaster2.png'
import './styles/Navbar.css'
import Avatar from './Avatar'


class Navbar extends React.Component {
    render() {
        return(
            <div className="Navbar">
                <ul className="nav">
                    <li className="logo_Container"><Link to="#"><img className="logo" src={logo}/></Link></li>
                    <li>
                        <form className="SearchComponent__container"> 
                            <input className="searchComponent" type="text"/>
                            <input className="icon-search-solid Search__button" value={"\ue90a"} type="submit"/>
                        </form>
                        </li>
                    <li className="button_personaliza"><Link to="#">¡Personaliza!</Link></li>
                    <li><Link to="#"><span class="icon-shopping-cart-solid cart-icon"></span></Link></li>
                    <li className="avatarImg"><Link to="#"><Avatar/></Link></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;