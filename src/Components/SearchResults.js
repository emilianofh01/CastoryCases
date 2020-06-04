import React from 'react'
import {Link} from 'react-router-dom'
import './styles/SearchBar.css'
const API = "https://us-central1-castory-cases.cloudfunctions.net"
const PATH = '/search'


class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            busqueda: "",
            productos: [],
            count: 0,
        }
    }

    buscar = () => {
        setTimeout(()=> {
            if(this.state.busqueda != "") {
                if(this.props.busqueda != this.state.busqueda) {
                    this.setState({busqueda:this.props.busqueda, count: 0})
                 } else {
                     if(this.state.count <= 0) {
                         fetch(API + PATH + `/${this.props.busqueda}`)
                          .then(response => response.json())
                          .then(data => this.setState({ productos: data, count: this.state.count + 1}));
                     } 
                }
            } else {
                this.setState({busqueda: this.props.busqueda})
            }
        },1000)
    }

    componentDidUpdate() {
        this.buscar()
        
    }

    render() {
        // console.log(this.props.busqueda)
        const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const {productos} = this.state
        const {busqueda} = this.props
        const lowerCasedFilter = removeAccents(busqueda.toLowerCase());
        const DatosFiltrados = productos.filter(producto => removeAccents(producto.productName.toLowerCase()).includes(lowerCasedFilter))
        
        return(
            <ul className={this.props.busqueda ? "SearchComponent__results-container show": "SearchComponent__results-container"}>
                <h3 className="results">Resultados</h3>
                {DatosFiltrados.length && this.props.busqueda !== " " ? DatosFiltrados.map((producto)=>(
                <li key={producto.id} className="item_result">
                    <Link onClick={this.props.reset} className="linkProduct" to={`/cases/id?=${producto.id}`}>
                        <img className="itemImage" src={producto.productImages} alt="CasePhoto"/>
                        <p className="item_title">{producto.productName}</p>
                        <p className="item_price">${producto.productPrice} MXN</p>
                        </Link>
                        </li>
                        )): <p className="NoResult">No se han encontrado resultados para "{this.props.busqueda}" </p>}
            </ul>
        )
    }
}

export default SearchResults