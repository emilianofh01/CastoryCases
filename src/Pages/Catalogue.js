import React from 'react'
import './styles/Catalogue.css'
import appleIcon from '../media/images/apple.png'
import xiaomiIcon from '../media/images/xiaomi.png'
import huaweiIcon from '../media/images/Huawei.png'
import motorolaIcon from '../media/images/motorola.png'
import samsungIcon from '../media/images/samsung.png'
import sonyIcon from '../media/images/sony.png'
import iPhone from '../media/images/iphone11.jpg'
import LoadingPhone from '../Components/LoadingPhone'

const API = "https://us-central1-castory-cases.cloudfunctions.net/searchfilter/"

class Catalogue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productos: [],
            loading: true,
            filter: {
                productCustom: false,
            }
        }
    }

    componentDidMount() {
        fetch(API + JSON.stringify(this.state.filter)) 
        .then(response => response.json())
        .then(data => this.setState({productos:data, loading: false}))
        setTimeout(()=> {
            const bg_navbar = document.querySelector(".bg-container");
            // bg_navbar.style.top = "0%"
            setTimeout(()=>{
                // bg_navbar.style.position = "fixed"
            },1000)
        },1000)
    }
    render() {
        return(
            <React.Fragment>
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
                                <img id="apple" className="brandButtons"  alt="BrandLogo"src={appleIcon}/>
                                <img id="xiaomi" className="brandButtons" alt="BrandLogo" src={xiaomiIcon}/>
                                <img id="huawei" className="brandButtons" alt="BrandLogo" src={huaweiIcon}/>
                                <img id="motorola" className="brandButtons" alt="BrandLogo" src={motorolaIcon}/>
                                <img id="samsung" className="brandButtons" alt="BrandLogo" src={samsungIcon}/>
                                <img id="sony"  className="brandButtons" alt="BrandLogo" src={sonyIcon}/>
                            </div>
                        </div>

                        <div className="Catalogue-list-container" >
                            {!this.state.loading ? this.state.productos.map((producto)=> (
                                <div key={producto.id} className="cardDevice">
                                    <div className="image-container">
                                        <img className="deviceImage" src={producto.productImages}/>
                                    </div>
                                    <h2 className="deviceTitle"> {producto.productName}</h2>
                                    <p className="productModel"> {producto.productModel} </p>
                                    <p className="devicePrice">${producto.productPrice}.00 MXN</p>
                                    <div className="favoriteButton-container">
                                        <span className="icon-heart-regular"></span>
                                        <p className="favoriteButtonText">Añadir a favoritos</p>
                                    </div>
                                </div>
                            )): <LoadingPhone className="LoadingPhone"/>}
                        </div>

                    </div>
                </div>

            </React.Fragment>
        ) 
        
    }
}

export default Catalogue