import React from "react";
import {Switch, Redirect, BrowserRouter, Route} from 'react-router-dom'
import Layout from './Layout'
import homepage from '../Pages/homepage'
import '../global.css'
import PhoneCanvas from '../Pages/PhoneCanvas'

function App(props) {
    
    return(
        <BrowserRouter>
        <Layout hasTobeRendered={false}>
            <Switch>
                    <Route exact path="/test" component={PhoneCanvas}/>
                    <Route exact path="/" component={homepage}/>
            </Switch>
        </Layout>
        </BrowserRouter>
    )
}

export default App;