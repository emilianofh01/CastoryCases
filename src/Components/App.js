import React from "react";
import {Switch, Redirect, BrowserRouter, Route} from 'react-router-dom'
import Layout from './Layout'
import Homepage from '../Pages/Homepage'
import '../global.css'
//import '../normalize.css'
import testpage from "../test/testpage";
import selectDevice from '../Pages/selectDevice'



function App(props) {
    
    return(
        <BrowserRouter>
        <Layout>
            <Switch>
                    <Route exact path="/test" component={testpage}/>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/personaliza" component={selectDevice}/> 
                    {/* <Redirect from="*" to="/" /> */}
            </Switch>
        </Layout>
        </BrowserRouter>
    )
}

export default App;