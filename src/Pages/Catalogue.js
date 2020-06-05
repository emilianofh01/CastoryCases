import React from 'react'
import './styles/Catalogue.css'
import appleIcon from '../media/images/apple.png'
import xiaomiIcon from '../media/images/xiaomi.png'
import huaweiIcon from '../media/images/Huawei.png'
import motorolaIcon from '../media/images/motorola.png'
import samsungIcon from '../media/images/samsung.png'
import sonyIcon from '../media/images/sony.png'
import iPhone from '../media/images/iphone11.jpg'

const API = "https://us-central1-castory-cases.cloudfunctions.net/search/"

class Catalogue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productos: []
        }
    }

    componentDidMount() {
        fetch(API) 
        .then(response => response.json())
        .then(data => this.setState({productos:data}))
        setTimeout(()=> {
            const bg_navbar = document.querySelector(".bg-container");
            bg_navbar.style.top = "0%"
            setTimeout(()=>{
                bg_navbar.style.position = "fixed"
            },1000)
        },1000)
    }
    render() {
        return(
            <div className="Catalogue-container">
                <div className="bg-container"></div>

                <div className="catalogue">
                    <div className="filter-container">
                        <h3 className="price-title">Precio</h3>
                        <div className="txtBox-filter-container">
                            <input className="filter" type="text" placeholder="Minimo"></input>
                            <input className="filter" type="text" placeholder="Maximo"></input>
                        </div>
                        <h3 className="price-title">Marca</h3>
                        <div className="brandFilter">
                            <img id="apple" className="brandButtons" src={appleIcon}/>
                            <img id="xiaomi" className="brandButtons" src={xiaomiIcon}/>
                            <img id="huawei" className="brandButtons" src={huaweiIcon}/>
                            <img id="motorola" className="brandButtons" src={motorolaIcon}/>
                            <img id="samsung" className="brandButtons" src={samsungIcon}/>
                            <img id="sony"  className="brandButtons" src={sonyIcon}/>
                        </div>
                    </div>

                    <div className="Catalogue-list-container">
                        {this.state.productos.map((producto)=> (
                            <div key={producto.id} className="cardDevice">
                                <div className="image-container">
                                    <img className="deviceImage" src={producto.productImages}/>
                                </div>
                                <h2 className="deviceTitle"> {producto.productName}</h2>
                                <p class="productModel"> {producto.productModel} </p>
                                <p className="devicePrice">$299.00</p>
                                <div></div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        ) 
        
    }
}

export default Catalogue