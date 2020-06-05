import React from 'react'
import {Link} from 'react-router-dom'
import './styles/SearchBar.css'
import loading from '../media/images/loading.gif'
import './styles/SearchResults.css'

const API = "https://us-central1-castory-cases.cloudfunctions.net"
const PATH = '/search'
var startTimeMS = 0;  // EPOCH Time of event count started
var timerId = 0;          // Current timer handler
var timerStep=1000;   // Time beetwen calls
var timeTaken = 0;


class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            busqueda: "",
            productos: [],
            count: 0,
            loading: true
        }
    }

    buscar = async () => {
        this.setState({loading: true})
        await this.startTimer()
        if(this.props.busqueda != "") {
            if(timeTaken <= 1000) {
                await fetch(API + PATH + `/${this.props.busqueda}`)
                .then(response => response.json())
                .then(data => this.setState({productos: data,busqueda: this.props.busqueda, loading: false, count: this.state.count + 1}));
                clearTimeout(this.startTimer())
            } 
        }
           
    }

    
    
    componentWillReceiveProps() {
        this.buscar()
        
    }

    eventRaised = () => {
        
        timeTaken = this.getRemainingTime()
        console.log(timeTaken)
        
        clearTimeout(timerId) // clear timer
        
    }

    startTimer() {
        startTimeMS = (new Date()).getTime();
        timerId = setTimeout(this.eventRaised,timerStep);
    }

    getRemainingTime = () => ((new Date()).getTime() - startTimeMS );
    

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

                {DatosFiltrados.length && this.props.busqueda !== " " ? DatosFiltrados.map((producto) =>(
                    
                <li key={producto.id} className="item_result">
                    <Link onClick={this.props.reset} className="linkProduct" to={`/cases/id?=${producto.id}`}>
                        <img className="itemImage" src={producto.productImages} alt="CasePhoto"/>
                        <div>
                            <p className="item_title">{producto.productName} - {producto.productModel}</p>
                            <p className="item_brand">Marca: {producto.productBrand} </p>
                        </div>
                        <p className="item_price">${producto.productPrice} MXN</p>
                        </Link>
                        </li>
                        )): this.state.loading ? <img className="loading" src={loading} alt="Loading"/>
                        : <p className="NoResult">No se ha encontrado resultados resultados para tu busqueda <b>({this.props.busqueda})</b></p>}
            </ul>
        )
    }
}

export default SearchResults