import React, { useCallback, useState } from 'react'
import './styles/SearchBar.css'
import {Link} from 'react-router-dom'
import SearchResults from './SearchResults'
const API = "https://us-central1-castory-cases.cloudfunctions.net"
const PATH = '/quicksearch'

// https://emilianofh01.github.io/hyperblog/data.json

class SearchBar extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            busqueda: "",
            
            
        }    
        
    }
    filtrar = (busqueda) => {
        this.setState({busqueda:busqueda.target.value});
    }

    searchReset = (e) => {
        var controller = new AbortController();
        controller.abort();
        this.setState({busqueda:''})

    }

    componentDidMount() {
        
    }

    buscar = async (e) => {
           await fetch(API + PATH + `/${e}`)
             .then(response => response.json())
             .then(data => this.setState({ productos: data}));
    }
    
    render() {        
        return(
            <div className="SearchComponent__Search">
                        <form className="SearchBar__container" onSubmit={e => {e.preventDefault()}}> 
                            <input value={this.state.busqueda} onChange={this.filtrar} className="searchBar" type="text"/>
                            <input className="icon-search-solid Search__button" value={"\ue90a"} type="submit"/>
                        </form>
                        <SearchResults busqueda={this.state.busqueda} reset={this.searchReset} request={this.buscar}/>
                        
            </div>
        )
    }
}
export default SearchBar