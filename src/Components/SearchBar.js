import React, { useCallback, useState } from 'react'
import './styles/SearchBar.css'
import {Link} from 'react-router-dom'
const API = "https://us-central1-castory-cases.cloudfunctions.net"
const PATH = '/search'

// https://emilianofh01.github.io/hyperblog/data.json

class SearchBar extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            busqueda: '',
            productos: [],
            
        }    
        this.productos = this.state.productos
    }
    filtrar = (busqueda) => {
        this.setState({busqueda:busqueda.target.value});
        fetch(API + PATH + `/${this.state.busqueda}`)
          .then(response => response.json())
          .then(data => this.setState({ productos: data }));
    }
    searchReset = () => this.setState({busqueda:''})

    componentDidMount() {
        
    }
    
    render() {
        const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const {busqueda, productos} = this.state
        const lowerCasedFilter = removeAccents(busqueda.toLowerCase());
        const DatosFiltrados = productos.filter(producto => removeAccents(producto.productName.toLowerCase()).includes(lowerCasedFilter))
        
        return(
            <div className="SearchComponent__Search">
                        <form className="SearchBar__container" onSubmit={e => {e.preventDefault()}}> 
                            <input value={this.state.busqueda} onChange={this.filtrar} className="searchBar" type="text"/>
                            <input className="icon-search-solid Search__button" value={"\ue90a"} type="submit"/>
                        </form>
                        
                        <ul className={this.state.busqueda ? "SearchComponent__results-container show": "SearchComponent__results-container"}>
                            <h3 className="results">Resultados</h3>
                            {DatosFiltrados.length && this.state.busqueda !== " " ? DatosFiltrados.map((producto)=>(
                                <li key={producto.id} className="item_result">
                                    <Link onClick={this.searchReset} className="linkProduct" to={`/cases/id?=${producto.id}`}>
                                        <img className="itemImage" src={producto.productImages} alt="CasePhoto"/>
                                        <p className="item_title">{producto.productName}</p>
                                        <p className="item_price">${producto.productPrice} MXN</p>
                                    </Link>
                                </li>
                            )): <p className="NoResult">No se han encontrado resultados para "{this.state.busqueda}" </p>}

                        </ul>
            </div>
        )
    }
}
export default SearchBar