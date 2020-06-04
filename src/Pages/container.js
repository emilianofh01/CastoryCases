import React from 'react'
import Homepage from './Homepage'
import Catalogue from './Catalogue'


class homepage extends React.Component {
     render() {
        return(
            <div className="pages-container" >
                <Homepage/>
                <Catalogue/>
                
            </div>
            
        )
    }
}

export default homepage;