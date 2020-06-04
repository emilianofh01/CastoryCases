import React from "react";
import {Switch, Redirect, BrowserRouter, Route} from 'react-router-dom'
import Layout from './Layout'
import container from '../Pages/container'
import '../global.css'
//import '../normalize.css'
import PhoneCanvas from './PhoneCanvas'
import testpage from "../test/testpage";



function App(props) {
    
    return(
        <BrowserRouter>
        <Layout>
            <Switch>
                    <Route exact path="/test" component={testpage}/>
                    <Route exact path="/" component={container}/>
                    {/* <Redirect from="*" to="/" /> */}
            </Switch>
        </Layout>
        </BrowserRouter>
    )
}

export default App;