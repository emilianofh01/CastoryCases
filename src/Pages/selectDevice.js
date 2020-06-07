import React from 'react'
import './styles/selectDevice.css'
import svg from '../media/images/rectangle.svg'
import appleIcon from '../media/images/apple.png'
import xiaomiIcon from '../media/images/xiaomi.png'
import huaweiIcon from '../media/images/Huawei.png'
import motorolaIcon from '../media/images/motorola.png'
import samsungIcon from '../media/images/samsung.png'
import sonyIcon from '../media/images/sony.png'

class selectDevice extends React.Component {
    irregularCircleOnLoad() {
        const head = document.querySelector(".headIrregular");
        head.style.top = "0%"
        setTimeout(()=> {
            head.style.position = "static"

        }, 1500)
    }

    componentDidMount() {
        setTimeout(() => {
            alert(
            "Hola maestra :D \nPor el momento esta caracteristica no se encuentra lista \nPuede ver nuestro catalogo, solo tiene que hacer click en la opcion del lado izquierdo en la pagina de inicio")
        }, 5000)
        setTimeout(()=> {
            const container = document.querySelector(".selectDevice-container_titles-container");
            container.style.opacity = "100%";
        }, 1500)
    }

    render() {
        return(
            <div className="selectDevice-container">
                <img className="headIrregular" onLoad={this.irregularCircleOnLoad} width={`${window.screen.availWidth}px`} src={svg}/>
                
                <div onLoad={this.boxShadow} className="selectDevice-container_titles-container">
                    <h1 className="title-container_title">Antes de comenzar</h1>
                    <h2 className="title-container_subtitle">Indicanos la marca de tu celular</h2>
                    
                
                    <div className="cardBrands-container">
                            <div className="cardsBrands">

                                <img className="iconBrand" id="appleIcon" src={appleIcon} alt="brandImage"/>
                            </div>
                            <div className="cardsBrands">
                                <img className="iconBrand" id="xiaomiIcon" src={xiaomiIcon} alt="brandImage"/>
                            </div>
                            <div className="cardsBrands">
                                <img className="iconBrand" id="huaweiIcon" src={huaweiIcon} alt="brandImage"/>
                            </div>
                            <div className="cardsBrands">
                                <img className="iconBrand" id="motorolaIcon" src={motorolaIcon} alt="brandImage"/>
                            </div>
                            <div className="cardsBrands">
                                <img className="iconBrand" id="samsungIcon" src={samsungIcon} alt="brandImage"/>
                            </div>
                            <div className="cardsBrands">
                                <img className="iconBrand" id="sonyIcon" src={sonyIcon} alt="brandImage"/>
                            </div> 
                    </div>
                    <div className="selectDevice_button-container">
                        <a className="selectDevice-button">Siguente</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default selectDevice 