import React from 'react'
import './styles/selectDevice.css'
import svg from '../media/images/rectangle.svg'

class selectDevice extends React.Component {
    irregularCircleOnLoad(e) {
        const head = document.querySelector(".headIrregular");
        head.style.top = "0%"
    }
    render() {
        return(
            <div className="selectDevice-container">
                <img className="headIrregular" onLoad={this.irregularCircleOnLoad} width={`${window.screen.availWidth}px`} src={svg}/>

            </div>
        )
    }
}

export default selectDevice 