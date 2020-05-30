import React from "react";
import {Switch, Redirect, BrowserRouter, Route} from 'react-router-dom'
import Layout from './Layout'
import homepage from '../Pages/homepage'

function App() {
    return(
        <BrowserRouter>
        <Layout>
            <Switch>
                    <Route exact path="/" component={homepage}/>
            </Switch>
        </Layout>
        </BrowserRouter>
    )
}

export default App;