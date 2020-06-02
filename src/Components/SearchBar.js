import React, { useCallback, useState } from 'react'
import './styles/SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            busqueda: '',
            productos: 
            [
                {
                    id: '1',
                    itemTitle: 'Bob Esponja',
                    itemPrice: 300,
                    image: 'https://funcases.mx/wp-content/uploads/2019/03/Huawei-Mate-20-Lite-Plastic-Case-600x750.jpg',
                },
                {
                    id: '2',
                    itemTitle: 'Pepe',
                    itemPrice: 300,
                    image: 'https://funcases.mx/wp-content/uploads/2019/03/Huawei-Mate-20-Lite-Plastic-Case-600x750.jpg',
                },
                {
                    id: '3',
                    itemTitle: 'Christian',
                    itemPrice: 300,
                    image: 'https://funcases.mx/wp-content/uploads/2019/03/Huawei-Mate-20-Lite-Plastic-Case-600x750.jpg',
                }
            ]
        }    
        this.productos = this.state.productos
    }
    filtrar = (busqueda) => 
    {
        this.setState({busqueda:busqueda.target.value})
        
    }
    render() {
        const {busqueda, productos} = this.state
        const lowerCasedFilter = busqueda.toLowerCase();
        const DatosFiltrados = productos.filter(producto => producto.itemTitle.toLowerCase().includes(lowerCasedFilter))

        return(
            <div className="SearchComponent__Search">
                        <form className="SearchBar__container"> 
                            <input value={this.state.busqueda} onChange={this.filtrar} className="searchBar" type="text"/>
                            <input className="icon-search-solid Search__button" value={"\ue90a"} type="submit"/>
                        </form>
                        
                        <ul className={this.state.busqueda ? "SearchComponent__results-container show": "SearchComponent__results-container"}>
                            <h3 className="results">Resultados</h3>
                            {this.state.busqueda ? DatosFiltrados.map((producto)=>(
                                
                                <li key={producto.id} className="item_result">
                                    <img className="itemImage" src={producto.image} alt="CasePhoto"/>
                                    <p className="item_title">{producto.itemTitle}</p>
                                    <p className="item_price">${producto.itemPrice} MXN</p>
                                </li>
                            )): ''}

                        </ul>
            </div>
        )
    }
}
export default SearchBar