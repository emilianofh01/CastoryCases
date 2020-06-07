import React from 'react'
import Mainscreen from '../screens/MainScreen'
import '../Pages/styles/deviceInfo.css'
import PhoneLoading from '../Components/LoadingPhone'
const API = 'https://us-central1-castory-cases.cloudfunctions.net/getProduct/'

class deviceInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            loading:true,
            productInfo: {
                
            },
            
        }
    }
    async componentDidMount() {

        const ID = this.props.match.params.id
        await fetch(API + ID) 
        .then(response => response.json())
        .then(data => this.setState({productInfo: data, loading: false}))
        console.log(this.state.productInfo)
        setTimeout(()=> {
            const bg_navbar = document.querySelector(".bg-container");
            bg_navbar.style.top = "0%"
            const container = document.querySelector(".deviceInfo-container")
            container.style.opacity = "100%"
        },1000)
    }
    render() {
        
        return(
            <div className="deviceInfo">
                <div className="bg-container"></div>
                {!this.state.loading ? <div className="deviceInfo-container">
                    <div className="deviceImage-container">
                        <img className="deviceInfo_image" src={this.state.productInfo.productImages}/>
                        <div className="shareBar"></div>
                    </div>

                    <div className="deviceDescription-container">
                        <div className="deviceInfo-info-container">
        
                            <div className="description-titles-container">
                                <h1 className="productName">{this.state.productInfo.productName}</h1>
                                <h2 className="productBrand">{this.state.productInfo.productBrand}</h2>
                                <p className="productModeltext">{this.state.productInfo.productModel}</p>
                            </div>
                            <div className="price-container">
                                <p> ${this.state.productInfo.productPrice}.00 MXN</p>
                            </div>

                        </div>

                        <div className="deviceInfo_instructions-container">
                            <Mainscreen/>
                        </div>
                        <div>
                            <h3 className="cantidad-title">Cantidad:</h3>
                            <div class="counter-container">
                                <a onClick={()=>this.setState({quantity:this.state.quantity - 1})} className="counter-suma">-</a>
                                <input value={this.state.quantity} className="counter-input" type="text" disabled/>
                                <a onClick={()=>this.setState({quantity:this.state.quantity + 1})} className="counter-resta">+</a>
                            </div>
                        </div>
                        <i className="icon-cart-plus-solid cart"></i>
                    </div>
                </div> 
            : <PhoneLoading/>}
            </div>
        )
    }
}

export default deviceInfo