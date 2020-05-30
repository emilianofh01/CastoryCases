import React from "react";
import {Link, Switch, RouterBrowser, Redirect, BrowserRouter, Router} from 'react-router-dom'

function App() {
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/"/>
            <Redirect from="*" to="/"/>
        </Switch>
        </BrowserRouter>
    )
}