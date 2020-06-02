import React, { useCallback, useState } from 'react'
import './styles/SearchBar.css'
import Data from '../data.json'

class SearchBar extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            busqueda: '',
            productos: Data,
            
        }    
        this.productos = this.state.productos
    }
    filtrar = (busqueda) => this.setState({busqueda:busqueda.target.value});

    render() {
        const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const {busqueda, productos} = this.state
        const lowerCasedFilter = removeAccents(busqueda.toLowerCase());
        const DatosFiltrados = productos.filter(producto => removeAccents(producto.itemTitle.toLowerCase()).includes(lowerCasedFilter))
        
        return(
            <div className="SearchComponent__Search">
                        <form className="SearchBar__container"> 
                            <input value={this.state.busqueda} onChange={this.filtrar} className="searchBar" type="text"/>
                            <input className="icon-search-solid Search__button" value={"\ue90a"} type="submit"/>
                        </form>
                        
                        <ul className={this.state.busqueda ? "SearchComponent__results-container show": "SearchComponent__results-container"}>
                            <h3 className="results">Resultados</h3>
                            {DatosFiltrados.length ? DatosFiltrados.map((producto)=>(
                                
                                <li key={producto.id} className="item_result">
                                    <img className="itemImage" src={producto.image} alt="CasePhoto"/>
                                    <p className="item_title">{producto.itemTitle}</p>
                                    <p className="item_price">${producto.itemPrice} MXN</p>
                                </li>
                            )): <p className="NoResult">No se han encontrado resultados para "{this.state.busqueda}" </p>}

                        </ul>
            </div>
        )
    }
}
export default SearchBar