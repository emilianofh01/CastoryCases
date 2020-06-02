import React from 'react'
import './styles/SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            productos: 
            [
                {
                    itemTitle: 'Carcasa de uso rudo',
                    itemPrice: 300,
                    image: 'https://funcases.mx/wp-content/uploads/2019/03/Huawei-Mate-20-Lite-Plastic-Case-600x750.jpg',
                }
            ]
        }    
        this.productos = this.state.productos
    }

    render() {
        console.log(this.productos)
        return(
            <div className="SearchComponent__Search">
                        <form className="SearchBar__container"> 
                            <input className="searchBar" type="text"/>
                            <input className="icon-search-solid Search__button" value={"\ue90a"} type="submit"/>
                        </form>
                        <ul className="SearchComponent__results-container">
                            <h3>Resultados</h3>
                            <li className="item_result">
                                <img className="itemImage" src={this.productos[0].image} alt="CasePhoto"/>
                                <p className="item_title">{this.productos[0].itemTitle}</p>
                                <p className="item_price">{this.productos[0].itemPrice}</p>
                            </li>
                        </ul>
            </div>
        )
    }
}
export default SearchBar