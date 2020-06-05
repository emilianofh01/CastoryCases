import React from "react";
import {Switch, Redirect, BrowserRouter, Route} from 'react-router-dom'
import Layout from './Layout'
import Homepage from '../Pages/Homepage'
import '../global.css'
//import '../normalize.css'
import testpage from "../test/testpage";
import selectDevice from '../Pages/selectDevice'
import Catalogue from '../Pages/Catalogue'



function App(props) {
    
    return(
        <BrowserRouter>
        <Layout>
            <Switch>
                    <Route exact path="/test" component={testpage}/>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/personaliza" component={selectDevice}/> 
                    <Route exact path="/catalogo" component={Catalogue}/>
                    {/* <Redirect from="*" to="/" /> */}
            </Switch>
        </Layout>
        </BrowserRouter>
    )
}

export default App;