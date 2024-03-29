import React from 'react'
import {Link} from 'react-router-dom'
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
                priceRange: [0,1000]
            }
        }
    }

    filtrar = (e) => {
        this.setState({loading:true})
        const id = e.target.id
        var filter = this.state.filter
        filter.productBrand = id
        fetch(API + JSON.stringify(filter)) 
        .then(response => response.json())
        .then(data => this.setState({productos:data, loading: false}))
        console.log(filter.productBrand)

        this.setState({productBrand: filter.productBrand})
    }

   

    fetch = () => {
        this.setState({loading:true})
        fetch(API + JSON.stringify(this.state.filter)) 
        .then(response => response.json())
        .then(data => this.setState({productos:data, loading: false}))
    }
    defaultFetch = () => {
        delete this.state.filter.productBrand;
        this.setState({loading:true})
        fetch(API + JSON.stringify(this.state.filter)) 
        .then(response => response.json())
        .then(data => this.setState({productos:data, loading: false}))
    }
    async componentDidMount() {
        this.fetch()
        setTimeout(()=> {
            const bg_navbar = document.querySelector(".bg-container");
            const catalogue = document.querySelector(".catalogue")
            bg_navbar.style.top = "0%"
            catalogue.style.opacity = "1"
        },1000)
    }
    priceFilterMin = (e) => {
        var value = e.target.value
        var filtrado = this.state.filter
        if(value === "") {
            filtrado.priceRange[0] = 0
        } else {
            filtrado.priceRange[0] = value;
        }
        this.setState({filter:filtrado})
        console.log(filtrado)
    }
    priceFilterMax = (e) => {
        var value = e.target.value
        var filtrado = this.state.filter
        if(value === "") {
            filtrado.priceRange[1] = 9999
        } else {
            filtrado.priceRange[1] = value;
        }
        this.setState({filter:filtrado})
        console.log(filtrado)
    }
    render() {
        return(
            <React.Fragment>
                <div className="Catalogue-container">
                <div className="bg-container"></div>

                    <div className="catalogue">
                        <div className="filter-container">
                            <h1 className="title-filter">Filtro</h1>
                            <h3 className="price-title">Precio</h3>
                            <div className="txtBox-filter-container">
                                <input onChange={this.priceFilterMin} min="0" max="9999" className="filter" type="number" placeholder="Min."></input>
                                <input onChange={this.priceFilterMax} min="0" max="9999" className="filter"  type="number" placeholder="Max."></input>
                                <a onClick={this.fetch} className="aplicarButton">Aplicar</a>
                            </div>
                            <h3 className="price-title">Marca</h3>
                            <div className="brandFilter">
                                <img onClick={this.filtrar} id="Apple" className="brandButtons"  alt="BrandLogo"src={appleIcon}/>
                                <img onClick={this.filtrar} id="Xiaomi" className="brandButtons" alt="BrandLogo" src={xiaomiIcon}/>
                                <img onClick={this.filtrar} id="Huawei" className="brandButtons" alt="BrandLogo" src={huaweiIcon}/>
                                <img onClick={this.filtrar} id="Motorola" className="brandButtons" alt="BrandLogo" src={motorolaIcon}/>
                                <img onClick={this.filtrar} id="Samsung" className="brandButtons" alt="BrandLogo" src={samsungIcon}/>
                                <img onClick={this.filtrar} id="Sony"  className="brandButtons" alt="BrandLogo" src={sonyIcon}/>
                                <p className="brandButtons" onClick={this.defaultFetch}>Todas las marcas</p>
                            </div>
                        </div>

                        <div className="Catalogue-list-container" >
                            {!this.state.loading ? this.state.productos.map((producto)=> (
                                <div key={producto.id} className="cardDevice">
                                    <Link className="catalogue-link" to={`/cases/${producto.id}`}>
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
                                    </Link>
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