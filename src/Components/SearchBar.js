import React from 'react'
import './styles/SearchBar.css'

class SearchBar extends React.Component {
    render() {
        return(
            <React.Fragment>
                <form className="SearchComponent__container"> 
                            <input className="searchComponent" type="text"/>
                            <input className="icon-search-solid Search__button" value={"\ue90a"} type="submit"/>
                        </form>
            </React.Fragment>
        )
    }
}
export default SearchBar