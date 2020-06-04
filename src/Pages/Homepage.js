import React from 'react'
import './styles/homepage.css'
import { Redirect } from 'react-router-dom'

class homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
        }
    }
    nextPage = () => {
        const Catalogue = document.getElementById("Catalogue");
        
        Catalogue.style.left = "0%";
        this.renderRedirect()
    }
    renderRedirect = () => {
        setTimeout(()=> {
            this.setState({redirect:true})
        },1000)
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to='/personaliza'/>
        }
        return(
            <React.Fragment>
                <div className="pages homepage_container">
                    <span onClick={this.nextPage} className="icon-paint-brush-solid icon" id="iconBrush"></span>
                    <span className="icon-store-alt-solid icon" id="iconCatalogue"></span>
                </div>
                <div id="Catalogue" className="pages Catalogue_container">
                    
                </div>
            </React.Fragment>
        )
    }
}

export default homepage