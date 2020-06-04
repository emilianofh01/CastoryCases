import React from 'react'
import './styles/homepage.css'

class homepage extends React.Component {
    render() {
        return(
            <div className="pages homepage_container">
                <span className="icon-paint-brush-solid" id="iconBrush"></span>
                <span className="icon-paint-brush-solid" id="iconCatalogue"></span>
            </div>
        )
    }
}

export default homepage