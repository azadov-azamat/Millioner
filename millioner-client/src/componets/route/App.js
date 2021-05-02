import React, {Component} from 'react';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import GameHomePage from "../pages/Client/GameHomePage";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import GameStartAdmin from "../pages/admin/AdminHomePage";
import GamePage from "../pages/GamePage";
import Test from '../Test/Test';
import AddQuestion from "../pages/admin/AddQuestion";
import AllQuestion from "../pages/admin/AllQuestion";
import AllUsers from "../pages/admin/AllUsers";
import ClientFriends from "../pages/Client/ClientFriends";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/gameStartAdmin" component={GameStartAdmin}/>
                    <Route path="/gameHomePageClient" component={GameHomePage}/>
                    <Route path="/startGame" component={GamePage}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/test" component={Test}/>
                    <Route path="/addQuestion" component={AddQuestion}/>
                    <Route path="/allQuestion" component={AllQuestion}/>
                    <Route path="/allUsers" component={AllUsers}/>
                    <Route path="/clientFriends" component={ClientFriends}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}
App.propTypes={};

export default App;
