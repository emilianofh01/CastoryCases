import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../media/remaster2.png'
import './styles/Navbar.css'

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
                    <li><Link to="#">AC</Link></li>
                    <li><Link to="#"><img src="#"/></Link></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;