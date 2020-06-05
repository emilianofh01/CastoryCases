import React from 'react'
import './styles/homepage.css'
import { Redirect } from 'react-router-dom'

class homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            redirect2:false,
        }
    }
    nextPage = () => {
        const Catalogue = document.getElementById("Catalogue");
        
        Catalogue.style.left = "0%";
        this.renderRedirect()
    }
    nextPage2 = () => {
        const Catalogue = document.getElementById("Catalogue2");
        
        Catalogue.style.left = "0%";
        this.renderRedirect2()
    }
    renderRedirect = () => {
        setTimeout(()=> {
            this.setState({redirect:true})
        },2000)
    }
    renderRedirect2 = () => {
        setTimeout(()=> {
            this.setState({redirect2:true})
        },2000)
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to='/personaliza'/>
        } else if(this.state.redirect2) {
            return <Redirect to='/catalogo'/>
        }
        return(
            <React.Fragment>
                <div className="pages homepage_container">
                    <span onClick={this.nextPage} className="icon-paint-brush-solid icon" id="iconBrush"></span>
                    <span onClick={this.nextPage2} className="icon-store-alt-solid icon" id="iconCatalogue"></span>
                </div>
                <div id="Catalogue" className="pages Catalogue_container">
                    
                </div>
                <div id="Catalogue2" className="pages">
                    
                </div>
            </React.Fragment>
        )
    }
}

export default homepage