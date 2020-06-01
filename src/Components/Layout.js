import React from 'react'
import Navbar from './Navbar'

function Layout(props) {
return(
        <React.Fragment> 
            {window.location.pathname === '/test' || window.location.pathname === '/test/' ? '' : <Navbar/>}
            {props.children}
        </React.Fragment>
    )
}

export default Layout